import { Component, OnInit } from '@angular/core';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/service/api.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  public content;
  // public options: AnimationOptions = {
  //   // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json',
  //   path: '/assets/json/loading.json',
  //   autoplay: true,
  //   loop: false
  // };

  constructor(
    private api: ApiService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.helper.preparePage('Get Lost - Home');
    this.api.getHomepage().subscribe(res => this.content = res);
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }

}
