import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/service/api.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  public content;

  constructor(
    private api: ApiService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.helper.preparePage('Get Lost - Home');
    this.api.getHomepage().subscribe(res => this.content = res);
  }
}
