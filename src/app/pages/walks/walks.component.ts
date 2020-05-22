import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Options } from 'ng5-slider';

import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';
import { LocationService } from 'src/app/service/location.service';


@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html'
})
export class WalksComponent implements OnInit {
  public isCollapsed = true;
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

  public initialFilter = {
    province: '',
    difficulty: [this.minDifficulty, this.maxDifficulty],
    kids_friendly: false,
    wheelchair_friendly: false,
  };

  public filterForm = this.fb.group({
    province: [this.initialFilter.province, [Validators.required]],
    difficulty: [this.initialFilter.difficulty, [Validators.required]],
    kids_friendly: [this.initialFilter.kids_friendly, [Validators.required]],
    wheelchair_friendly: [this.initialFilter.wheelchair_friendly, [Validators.required]]
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private titleService: Title,
    private location: LocationService
  ) { }

  ngOnInit(): void {
    this.setWindow('Get Lost - Overzicht');
    this.getWalks();
    // console.log(this.filterForm.value);

  }

  protected setWindow(newTitle: string) {
    this.titleService.setTitle(newTitle);

    if (window.innerWidth > 768) {
      // md-breakpoint
      this.isCollapsed = false;
    }
  }

  protected getWalks(): void {
    if (this.walks === undefined) {
      this.api.getWalks().subscribe((res) => {
        // console.log('WalksComponent -> getWalks -> res', res);
        res.forEach((walk) => {
          walk.province = walk.province.replace(/_/g, ' ');
          walk.distance = this.location.getDistance(walk.checkpoint);
        });
        this.walks = res;
        // console.log('WalksComponent -> getWalks -> res', res);
        this.filteredWalks = res;

        this.updateWalks(true);
      });
    }
  }

  public changeProvince(e, item): void {
    // const formArray: FormArray = this.filterForm.get('myChoices') as FormArray;

    if (e.target.checked && !this.filteredProvinces.includes(item)) {
      this.filteredProvinces.push(item);
    }

    if (!e.target.checked) {
      this.filteredProvinces = this.filteredProvinces.filter(province => province !== item);
    }

    this.filterForm.controls[`province`].setValue(this.filteredProvinces);
    this.filterForm.controls[`province`].updateValueAndValidity();

    this.updateWalks();
  }

  public changeDifficulty(e): void {
    this.updateWalks();
  }

  public onToggle(e) {
    this.updateWalks();
  }


  public resetFilter(filter) {
    this.filterForm.reset(filter);

    this.updateWalks();
  }

  protected updateWalks(init?: boolean): void {
    const result = [];
    let filter = this.filterForm.value;
    // console.log('WalksComponent -> updateWalks -> filter', filter);

    if (init && sessionStorage.getItem('filter')) {
      // if onInit
      filter = JSON.parse(sessionStorage.getItem('filter'));
    }
    else {
      sessionStorage.setItem('filter', JSON.stringify(filter));
    }
    // save filter to sessionStorage
    // sessionStorage.setItem('filter', JSON.stringify(filter));


    this.walks.forEach((walk) => {
      if (this.difficultyBetweenRange(walk.difficulty, filter.difficulty)) {
        if (this.booleanFilter(walk.kids_friendly, filter.kids_friendly)) {
          if (this.booleanFilter(walk.wheelchair_friendly, filter.wheelchair_friendly)) {
            if (this.provinceFilter(walk.province, filter.province)) {
              result.push(walk);
            }
          }
        }
      }
    });

    this.filteredWalks = result;
  }

  protected difficultyBetweenRange(value, filter): boolean {
    // if walk difficulty is between set difficulty
    if (value >= filter[0] && value <= filter[1]) {
      return true;
    }
    return false;
  }

  protected booleanFilter(value, filter): boolean {
    // if checkbox is checked, only return true, if not checked, return all
    if (filter) {
      return value;
    }
    return true;
  }

  protected provinceFilter(value, filter): boolean {
    if (filter.length !== 0) {
      // If filter contains province only show checked provinces.
      if (filter.includes(value.replace(/_/g, ' '))) {
        return true;
      }
    }
    else {
      // If nothing selected in filtered, show all
      return true;
    }
  }

}
