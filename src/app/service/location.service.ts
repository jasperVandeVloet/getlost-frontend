import { Injectable } from '@angular/core';
import { Coordinate } from '../models/coordinate';
import { Checkpoint } from '../models/checkpoint';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  /**
   * Calculate distance from current location to checkpoint
   * Resource: http://www.movable-type.co.uk/scripts/latlong.html
   */
  public calculateDistance(currentLocation: Coordinate, destination: Coordinate) {
    const R = 63710; // earthRadius in km
    const dLat = (destination.latitude - currentLocation.latitude) * Math.PI / 180;
    const dLng = (destination.longitude - currentLocation.longitude) * Math.PI / 180;

    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(currentLocation.latitude * Math.PI / 180) * Math.cos(destination.latitude * Math.PI / 180) *
      (1 - Math.cos(dLng)) / 2;

    const result = R * 2 * Math.asin(Math.sqrt(a)) * 100;

    return Math.floor(result);
  }

  public getDistance(points: Checkpoint[]): number {
    let distance = 0;

    if (points.length > 2) {
      for (let i = 0; i < points.length - 1; i++) {
        distance += this.calculateDistance(points[i].coordinate, points[i + 1].coordinate);
      }
    }
    return Math.ceil(distance / 1000);
  }
}
