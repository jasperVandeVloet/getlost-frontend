import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Checkpoint } from 'src/app/models/checkpoint';

@Component({
  selector: 'app-checkpoint-modal',
  templateUrl: './checkpoint-modal.component.html'
})
export class CheckpointModalComponent implements OnInit {
  public checkpoint: Checkpoint;
  public title: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    console.log(this.checkpoint);
  }

}
