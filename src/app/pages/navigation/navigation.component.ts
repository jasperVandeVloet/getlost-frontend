import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DeviceService } from 'src/app/service/device.service';
import { Coordinate } from 'src/app/models/coordinate';
import { Checkpoint } from 'src/app/models/checkpoint';
import { CheckpointModalComponent } from 'src/app/components/checkpoint-modal/checkpoint-modal.component';
import { FinishModalComponent } from 'src/app/components/finish-modal/finish-modal.component';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  protected bsModalRef: BsModalRef;
  protected optionsHighAccuracy = { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true };
  protected optionsLowAccuracy = { maximumAge: 600000, timeout: 10000, enableHighAccuracy: false };
  protected fenceRadius = 25; // radius of how close to get to checkpoint in m.
  protected onWayBack = false;

  public checkpoints: Checkpoint[];
  public destinationAngle = 0;
  public currentLocation: Coordinate = { latitude: 0, longitude: 0 };
  public destination: Checkpoint;
  public distance: number;
  public distanceString = '\u221e';
  public walkTitle: string;
  public currentCheckpoint = 0;

  // DEBUGGING VARIABLES
  public distanceAccuracy;
  public angleAccuracy;
  public error;

  constructor(
    private device: DeviceService,
    private modalService: BsModalService,
    private helper: HelperService,
    private router: Router,
    private location: LocationService
  ) { }

  ngOnInit(): void {
    this.helper.preparePage('Get Lost - Ergens onderweg');
    this.getDataFromStorage();
    this.getDataFromDevice();
  }

  /**
   * Chosen route is stored in localStorage.
   * So user can use phone for other purpose and return to walking when needed.
   */
  protected getDataFromStorage(): void {

    if ((localStorage.getItem('checkpoints') === null) || (localStorage.getItem('walk') === null)) {
      localStorage.clear();
      // redirect
      this.router.navigate(['/wandelingen']);
    }
    else {
      this.walkTitle = localStorage.getItem('walk');
      this.checkpoints = JSON.parse(localStorage.getItem('checkpoints'));
    }
    console.log('NavigationComponent -> getDataFromStorage -> this.checkpoints', this.checkpoints);

    console.log('NavigationComponent -> getDataFromStorage )', localStorage.getItem('current'));
    this.setCurrentCheckpoint();
  }

  /**
   * If current is not set in localStorage this means a new walk is started
   * So first checkpoint get set.
   * If current is already set, this means a user was walking and is now returning, so we go further from current.
   */
  protected setCurrentCheckpoint(atCheckpoint?: boolean): void {
    // If nothing in storage
    if (localStorage.getItem('current') === null) {
      this.currentCheckpoint = 0;
      localStorage.setItem('current', this.currentCheckpoint.toString());
    }
    // if function called at checkpoint
    else if (atCheckpoint) {
      this.currentCheckpoint++;
      localStorage.setItem('current', this.currentCheckpoint.toString());
    }
    // if not at checkpoint, but has current so user started walking before
    else {
      this.currentCheckpoint = parseInt(localStorage.getItem('current'), 10);
    }

    if (this.currentCheckpoint < this.checkpoints.length) {
      this.destination = this.checkpoints[this.currentCheckpoint];
    }
    else if (this.currentCheckpoint === this.checkpoints.length) {
      // this.finishWalk();
    }

  }

  /**
   * Access device properties to get geolocation and orientation.
   */
  protected getDataFromDevice(): void {
    if (this.device.getBrowserData().mobile === true) {
      if (this.device.hasLocation()) {
        if (this.device.hasOrientation()) {
          this.getGeolocation();
          this.getOrientation();
        } else {
          alert('Device Orientation API not supported.');
        }
      } else {
        alert('Device Geolocation API not supported.');
      }
    }
    else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Get geolocation, when geo changes get new location (watch)
   * First try to get location with high accuracy,
   * If high accuary takes to long, switch to low accuracy
   */
  public getGeolocation(): void {
    navigator.geolocation.watchPosition(
      (position) => this.successCallback(position),
      (error) => this.errorCallback_highAccuracy(error),
      this.optionsHighAccuracy);
  }

  /**
   * This function is called when navigator.geolocation.watchPosition is succes
   */
  protected successCallback(position): void {
    this.currentLocation.latitude = this.roundUsing(position.coords.latitude, 6);
    this.currentLocation.longitude = this.roundUsing(position.coords.longitude, 6);

    // NEEDED OR ONLY DEBUGGING?
    this.distanceAccuracy = Math.floor(position.coords.accuracy);

    if (this.destination.coordinate !== undefined) {
      this.distance = this.location.calculateDistance(this.currentLocation, this.destination.coordinate);

      if (this.distance > 1000) {
        this.distanceString = (this.distance / 1000 + 'km').replace('.', ',');
      }
      else {
        this.distanceString = this.distance + 'm';
      }
    }
    else {
      this.error = 'No destination set.';
    }

    if (this.distance < this.fenceRadius) {
      this.arrivedAtCheckpoint();
    }
  }

  /**
   * This function is called when navigator.geolocation.watchPosition throw error in high accuracy
   */
  protected errorCallback_highAccuracy(error): void {
    console.log('NavigationComponent -> errorCallback_highAccuracy -> error', error);
    if (error.code === error.TIMEOUT) {
      console.log('attempting to get low accuracy location');
      navigator.geolocation.getCurrentPosition(
        (position) => this.successCallback(position),
        this.errorCallback,
        this.optionsLowAccuracy);
      return;
    }

    this.errorCallback(error, '(high accuracy attempt)');
  }

  /**
   * This function is called when navigator.geolocation.watchPosition throw error in high accuracy and low accuracy
   * Used to format the error msg
   */
  protected errorCallback(error, type?: string): void {
    console.log('NavigationComponent -> errorCallback -> error', error);
    let msg = `Can't get your location ${type}. Error = `;
    switch (error.code) {
      case 1:
        msg += 'PERMISSION_DENIED';
        break;

      case 2:
        msg += 'POSITION_UNAVAILABLE';
        break;

      case 3:
        msg += 'POSITION_UNAVAILABLE';
        break;
    }

    msg += ', ' + error.message;
    this.error = msg;
  }

  /**
   * Calculate distance from current location to checkpoint
   * Resource: http://www.movable-type.co.uk/scripts/latlong.html
   */
  // protected calculateDistance(currentLocation: Coordinate, destination: Coordinate) {
  //   const R = 63710; // earthRadius in km
  //   const dLat = (destination.latitude - currentLocation.latitude) * Math.PI / 180;
  //   const dLng = (destination.longitude - currentLocation.longitude) * Math.PI / 180;

  //   const a =
  //     0.5 - Math.cos(dLat) / 2 +
  //     Math.cos(currentLocation.latitude * Math.PI / 180) * Math.cos(destination.latitude * Math.PI / 180) *
  //     (1 - Math.cos(dLng)) / 2;

  //   const result = R * 2 * Math.asin(Math.sqrt(a)) * 100;

  //   return Math.floor(result);
  // }

  /**
   * Ask acces to device orientation and motion events
   * iOS 13+ has permission API to gain acces
   */
  public getOrientation(): void {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', (e) => {
              this.handleOrientation(e);
            });
          } else {
            const msg = 'No access to device orientation' + response;
            alert(msg);
          }
        })
        .catch((error) => alert(error));
    } else { // Android && iOS <13
      window.addEventListener('deviceorientation', (e) => {
        this.handleOrientation(e);
      }, true);
    }
  }

  /**
   * When device oriantation is granted orientation can be caught from event
   * Android uses e.absolute
   * iOS uses e.webkitCompassHeading
   */
  public handleOrientation(e): void {
    let deviceAngle: number;
    if (this.device.getOsData().os === 'Android' && e.absolute) {
      deviceAngle = Math.floor(e.alpha);
    } else if (this.device.getOsData().os === 'iOS' && e.webkitCompassHeading) {
      this.angleAccuracy = Math.floor(e.webkitCompassAccuracy);
      deviceAngle = Math.floor(e.webkitCompassHeading);
    }

    this.setArrowAngle(deviceAngle);
  }

  /**
   * Calculate angle against north,
   * manipulate this so it matches to device position
   */

  public setArrowAngle(deviceAngle): void {
    const begin: Coordinate = this.currentLocation;
    const endY: Coordinate = {
      latitude: this.destination.coordinate.latitude,
      longitude: begin.longitude
    };
    const endX: Coordinate = {
      latitude: begin.latitude,
      longitude: this.destination.coordinate.longitude
    };

    // calcuate distance for y-axis
    let y = this.location.calculateDistance(begin, endY);
    if (begin.latitude > this.destination.coordinate.latitude) {
      y *= -1;
    }

    // calcuate distance for x-axis
    let x = this.location.calculateDistance(begin, endX);
    if (begin.longitude > this.destination.coordinate.longitude) {
      x *= -1;
    }

    // calculate alpha (angle for compass)
    let alpha = Math.acos(y / this.distance) * (180 / Math.PI);

    if (x < 0) {
      alpha = 360 - alpha;
    }

    // Android angle is counter clockwise, iOs uses angle clockwise
    if (this.device.getOsData().os === 'Android') {
      alpha = Math.floor(alpha + deviceAngle);
    }
    else if (this.device.getOsData().os === 'iOS') {
      alpha = Math.floor(alpha - deviceAngle);
    }
    else {
      alpha = 0;
      this.error = 'Something went wrong calculating the angle';
    }

    if (alpha < 0) {
      alpha += 360;
    }
    if (alpha > 360) {
      alpha -= 360;
    }

    this.destinationAngle = alpha;
  }

  public arrivedAtCheckpoint(): void {
    if (!this.onWayBack) {
      this.openCheckpointModal();
      this.setCurrentCheckpoint(true);
    }
    else {
      this.bsModalRef = this.modalService.show(FinishModalComponent, { class: 'modal-dialog-centered', animated: true });
      this.modalService.onHidden.subscribe(() => {
        this.finishWalk();
      });
    }
  }

  protected openCheckpointModal() {
    const initialState = {
      checkpoint: this.checkpoints[this.currentCheckpoint],
      title: this.walkTitle,
      slug: localStorage.getItem('slug')
    };

    this.bsModalRef = this.modalService.show(CheckpointModalComponent, { initialState, class: 'modal-dialog-centered', animated: true });

    if (this.currentCheckpoint + 2 === this.checkpoints.length) {
      this.bsModalRef.content.closeBtnName = 'Nog één punt te gaan';
    }
    else if (this.currentCheckpoint + 1 === this.checkpoints.length) {
      this.bsModalRef.content.closeBtnName = 'Einde';
      this.bsModalRef.content.finish = true;
    }
    else {
      this.bsModalRef.content.closeBtnName = 'Naar het volgende punt';
    }

    this.bsModalRef.content.event.subscribe(res => {
      console.log(res);

      if (res) {
        console.log('return to start');
        this.returnToStart();
        this.bsModalRef.hide();
      }
      else {
        console.log('stop');
        this.bsModalRef.hide();
        this.finishWalk();
      }
    });
  }

  protected finishWalk() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  protected returnToStart() {
    this.checkpoints = JSON.parse(localStorage.getItem('checkpoints'));
    this.checkpoints.push(this.checkpoints[0]);
    console.log('NavigationComponent -> returnToStart -> this.checkpoints', this.checkpoints);
    this.setCurrentCheckpoint();
    this.onWayBack = true;
  }

  /**
   * Round to specific precision after point
   */
  protected roundUsing(num, prec) {
    let tempnum = num * Math.pow(10, prec);
    tempnum = Math.floor(tempnum);
    return tempnum / Math.pow(10, prec);
  }

  // FOR DEBUGGING ONLY!
  public clearStorage() {
    localStorage.removeItem('current');
    this.setCurrentCheckpoint();
  }

}
