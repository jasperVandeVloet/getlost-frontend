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

  public getWalks(): Observable<Walk[]> {
    return this.http.get<Walk[]>(this.basePath + 'walks');
  }

  public getWalk(slug: string): Observable<Walk> {
    return this.http.get<Walk>(this.basePath + 'walks/' + slug);
  }

  public getHomepage() {
    return this.http.get(this.basePath + 'homepage');
  }

  public getHowItWorksPage() {
    return this.http.get(this.basePath + 'how-it-works');
  }

  public getWalksPage() {
    return this.http.get(this.basePath + 'walkspage');
  }


}
