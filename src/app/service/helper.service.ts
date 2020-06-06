import { Injectable } from '@angular/core';
import * as Rellax from 'rellax';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public rellax;
  constructor(
    private titleService: Title,
  ) { }

  public preparePage(title?: string): void {
    console.log('test');
    this.rellax = new Rellax('.rellax');
    console.log('HelperService -> preparePage -> this.rellax', this.rellax);
    this.titleService.setTitle(title);
  }

}
