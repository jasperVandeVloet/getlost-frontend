import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Options } from 'ng5-slider';

import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html'
})
export class WalksComponent implements OnInit {
  public walks: Walk[];
  public filteredWalks: Walk[];
  public filteredProvinces = [];
  public provinces = [
    'antwerpen',
    'limburg',
    'oost vlaanderen',
    'west vlaanderen',
    'vlaams brabant',
    'waals brabant',
    'henegouwen',
    'luik',
    'luxemburg',
    'namen'];

  public sliderOptions: Options = {
    floor: 0,
    ceil: 5,
    step: 1
  };

  public minDifficulty = 0;
  public maxDifficulty = 5;

  public filterForm = this.fb.group({
    province: ['', [Validators.required]],
    difficulty: [[this.minDifficulty, this.maxDifficulty], [Validators.required, Validators.max(5)]],
    kids_friendly: [false, [Validators.required]],
    wheelchair_friendly: [false, [Validators.required]]
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getWalks();
  }

  protected getWalks(): void {
    if (this.walks === undefined) {
      this.api.getWalks().subscribe((res) => {
        this.walks = res;
        this.filteredWalks = res;
      });
    }
  }

  public changeProvince(e, item): void {
    if (e.target.checked && !this.filteredProvinces.includes(item)) {
      this.filteredProvinces.push(item);
    }

    if (!e.target.checked) {
      this.filteredProvinces = this.filteredProvinces.filter(province => province !== item);
    }

    this.filterForm.controls[`province`].setValue(this.filteredProvinces);
    this.filterForm.controls[`province`].updateValueAndValidity();

    this.filterWalks();
  }

  public changeDifficulty(e): void {
    this.filterWalks();
  }

  public onToggle(e) {
    this.filterWalks();
  }

  protected filterWalks(): void {
    const result = [];
    const filter = this.filterForm.value;

    if (filter.province.length !== 0) {
      this.walks.forEach((walk) => {
        // If filter contains province only show checked provinces.
        if (filter.province.includes(walk.province.replace(/_/g, ' '))) {
          result.push(walk);
        }
      });

      this.filteredWalks = result;
    }
    else {
      // If nothing selected in filtered, show all
      this.filteredWalks = this.walks;
    }
  }

}
