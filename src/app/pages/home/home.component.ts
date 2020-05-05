import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
declare var Rellax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})



export class HomeComponent implements OnInit {
  // public rellax;
  // public options: AnimationOptions = {
  //   // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json',
  //   path: '/assets/json/loading.json',
  //   autoplay: true,
  //   loop: false
  // };

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // this.rellax = new Rellax('.rellax');
    this.setTitle('Get Lost - Home');
  }

  protected setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }

}
