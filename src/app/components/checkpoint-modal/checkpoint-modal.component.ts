import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Checkpoint } from 'src/app/models/checkpoint';

@Component({
  selector: 'app-checkpoint-modal',
  templateUrl: './checkpoint-modal.component.html'
})
export class CheckpointModalComponent implements OnInit {
  public checkpoint: Checkpoint;
  public title: string;
  public closeBtnName: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.playAudio();
  }

  protected playAudio() {
    const audio = new Audio();
    audio.src = '/assets/audio/arrived.wav';
    audio.load();
    audio.play();
  }

}
