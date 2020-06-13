import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { HelperService } from 'src/app/service/helper.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {
  public path = environment.frontendVariablePath;
  public options: AnimationOptions = {
    // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json',
    path: '/assets/json/logo-spinning.json',
    autoplay: true,
    loop: true
  };

  constructor(
    private router: Router,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.helper.preparePage();
  }

  public hideFooterOn(url: string): boolean {
    if (this.router.url === url) {
      return false;
    }
    return true;
  }

}
