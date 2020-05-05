import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Walk } from '../models/walk';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected basePath = environment.apiBasePath;

  protected journeys: Walk[];

  constructor(
    public http: HttpClient,
  ) {}

  public getJourneys(): Observable<Walk[]> {
    return this.http.get<Walk[]>(this.basePath + 'walks');
  }


}
