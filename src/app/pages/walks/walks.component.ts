import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-walks',
  templateUrl: './walks.component.html'
})
export class WalksComponent implements OnInit {
  public walks: Walk[];
  public filterForm = this.fb.group({
    id: [''],
    name: [''],
    price: [''],
    size: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    cut: ['', [Validators.required]],
    package: ['', [Validators.required]],
    comment: ['']
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getWalks();
  }

  private getWalks(): void {
    this.api.getWalks().subscribe((res) => {
      this.walks = res;
      console.log('WalksComponent -> getWalks -> res', res);
    });
  }


}
