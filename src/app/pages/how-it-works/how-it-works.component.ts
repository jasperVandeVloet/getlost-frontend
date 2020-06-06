import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html'
})
export class HowItWorksComponent implements OnInit {
  public content;

  constructor(
    private api: ApiService,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.helper.preparePage('Get Lost - Hoe het werkt');
    this.api.getHowItWorksPage().subscribe(res => this.content = res);
  }

}
