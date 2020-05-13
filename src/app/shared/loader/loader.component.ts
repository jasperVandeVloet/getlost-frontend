import { Component, OnInit } from '@angular/core';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  public options: AnimationOptions = {
    // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json',
    path: '/assets/json/loading.json',
    autoplay: true,
    loop: true
  };
  constructor() { }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
  }
}
