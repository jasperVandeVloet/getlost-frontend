import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from 'src/app/service/api.service';

declare var Rellax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})



export class HomeComponent implements OnInit {
  public content;
  public rellax;
  // public options: AnimationOptions = {
  //   // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json',
  //   path: '/assets/json/loading.json',
  //   autoplay: true,
  //   loop: false
  // };

  constructor(
    private titleService: Title,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.rellax = new Rellax('.rellax');
    this.setTitle('Get Lost - Home');

    this.api.getHomepage().subscribe(res => this.content = res);
  }

  protected setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // animationCreated(animationItem: AnimationItem): void {
  //   console.log(animationItem);
  // }

}
