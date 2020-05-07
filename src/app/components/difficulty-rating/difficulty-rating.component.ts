import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-difficulty-rating',
  templateUrl: './difficulty-rating.component.html'
})
export class DifficultyRatingComponent implements OnInit {
  @Input()
  public difficulty: number;
  public rating = [];
  constructor() {}

  ngOnInit(): void {
    this.rating = Array(this.difficulty).fill(0).map((x, i) => i);
  }

}
