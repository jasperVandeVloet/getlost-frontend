import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private titleService: Title,
  ) { }

  public preparePage(title?: string): void {
    this.titleService.setTitle(title);
  }

}
