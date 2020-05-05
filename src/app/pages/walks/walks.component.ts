import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html'
})
export class WalksComponent implements OnInit {
  public walks: any;
  protected basePath = 'https://getlost-backend.herokuapp.com';
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getJourneys();
  }

  private getJourneys(): void {
    this.walks = this.api.getJourneys();
    this.api.getJourneys().subscribe((res) => console.log(res));
  }


}
