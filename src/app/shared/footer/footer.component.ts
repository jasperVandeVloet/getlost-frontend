import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {
  public path = environment.frontendVariablePath;

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
