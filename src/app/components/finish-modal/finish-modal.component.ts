import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-finish-modal',
  templateUrl: './finish-modal.component.html'
})
export class FinishModalComponent implements OnInit {
  protected audio;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.play();
    this.audio.src = '/assets/audio/soundeffect.wav';
    this.playAudio();
  }

  protected playAudio() {
    this.audio.load();
    this.audio.play();
  }

  public close() {
    this.audio.pause();
    this.bsModalRef.hide();
  }
}
