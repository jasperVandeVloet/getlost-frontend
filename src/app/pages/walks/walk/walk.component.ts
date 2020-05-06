import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styles: [
  ]
})
export class WalkComponent implements OnInit {
  public walk: Walk;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     this.getWalk(params.slug);
    });
  }

  private getWalk(slug: string): void {
    this.api.getWalk(slug).subscribe((res) => {
      this.walk = res;
      console.log('WalkComponent -> getWalk -> res', res);
    });
  }



}
