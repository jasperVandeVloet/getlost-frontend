import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/service/device.service';
import { Coordinate } from 'src/app/models/coordinate';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  public destinationAngle = 0;

  protected optionsHighAccuracy = { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true };
  protected optionsLowAccuracy = { maximumAge: 600000, timeout: 10000, enableHighAccuracy: false };

  public currentLocation: Coordinate = {
    latitude:  0,
    longitude: 0
  };

  public destination: Coordinate;
  public distance: number;

  // DEBUGGING VARIABLES
  public distanceAccuracy;
  public error;

  // TEMP
  public totalCheckpoints = 200; // CHANGE
  public currentCheckpoint = 100; // CHANGE

  constructor(
    private device: DeviceService
  ) { }

  ngOnInit(): void {
    // if (this.device.getBrowserData().mobile === true) {
    if (this.device.hasLocation()) {
      if (this.device.hasOrientation()) {
        this.getGeolocation();
      } else {
        alert('Device Orientation API not supported.');
      }
    } else {
      alert('Device Geolocation API not supported.');
    }
    // }
    // else {
    //   alert('Please use your phone');
    // }

  }

  public getGeolocation(): void {
    console.log('getGeoLocation()');
    navigator.geolocation.watchPosition(
      (position) => this.successCallback(position),
      (error) => this.errorCallback_highAccuracy(error),
      this.optionsHighAccuracy);
  }

  protected successCallback(position) {
    this.currentLocation.latitude = this.roundUsing(position.coords.latitude, 6);
    this.currentLocation.longitude = this.roundUsing(position.coords.longitude, 6);
    console.log('NavigationComponent -> successCallback -> this.currentLocation', this.currentLocation);

    this.distanceAccuracy = Math.floor(position.coords.accuracy);
    // this.distance = this.calculateDistance(this.currentLocation, this.destination);

    // this.checker = this.validateDistance(this.distance, this.fenceRadius);
    // this.setArrowAngle();
  }

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
    alert(msg);
    this.error = msg;
  }

  protected roundUsing(num, prec) {
    let tempnum = num * Math.pow(10, prec);
    tempnum = Math.floor(tempnum);
    return tempnum / Math.pow(10, prec);
  }

}
