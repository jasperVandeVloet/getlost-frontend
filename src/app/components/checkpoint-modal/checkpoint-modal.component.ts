import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Checkpoint } from 'src/app/models/checkpoint';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkpoint-modal',
  templateUrl: './checkpoint-modal.component.html'
})
export class CheckpointModalComponent implements OnInit {
  public checkpoint: Checkpoint;
  public title: string;
  protected slug: string;
  public closeBtnName: string; // MAG WEG
  public finish = false;
  protected specialEffect = new Audio();
  public pathAsVar = environment.frontendVariablePath;

  @Output() event = new EventEmitter<boolean>();

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.playAudio();
    this.pathAsVar = environment.frontendVariablePath + '%2Fwandelingen%2F' + this.slug;
  }

  protected playAudio() {
    this.specialEffect.pause();
    this.specialEffect.src = '/assets/audio/soundeffect.wav';
    this.specialEffect.play();
  }

  public returnToStart(agreed: boolean) {
    this.event.emit(agreed);
  }

}
