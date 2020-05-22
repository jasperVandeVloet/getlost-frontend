import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html'
})
export class HowItWorksComponent implements OnInit {
  public content;
  constructor(
    private titleService: Title,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.setTitle('Get Lost - Hoe het werkt');
    this.api.getHowItWorksPage().subscribe(res => this.content = res);
  }

  protected setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
