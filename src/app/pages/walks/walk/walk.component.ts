import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ApiService } from 'src/app/service/api.service';
import { Walk } from 'src/app/models/walk';
import { DeviceService } from 'src/app/service/device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styles: [
  ]
})
export class WalkComponent implements OnInit {
  public basePath = environment.frontendBasePath;
  public walk: Walk;

  public modalRef: BsModalRef;
  @ViewChild('confirmation') modalTemplate: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private titleService: Title,
    private device: DeviceService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getWalk(params.slug);
    });
  }

  protected setWindow(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  private getWalk(slug: string): void {
    this.api.getWalk(slug).subscribe((res) => {
      this.walk = res;
      this.setWindow('Get Lost - ' + res.title);
      console.log('WalkComponent -> getWalk -> res', res);
    });
  }

  public deviceIsMobile(): boolean {
    if (this.device.getBrowserData() !== undefined) {
      return this.device.getBrowserData().mobile;
    }
    return false;
  }

  public startWalking(): void {
    // If localStorage already contains a walk, ask permission to clear
    // Else run confirm()

    if (localStorage.getItem('walk') !== null) {
      this.openModal(this.modalTemplate);
    }
    else {
      this.saveToStorageAndGo();
    }
  }

  protected openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  public getWalkFromStorage(): string {
    if (localStorage.getItem('walk') !== null) {
      return localStorage.getItem('walk');
    }
    return 'Er ging iets mis. We konden je vorige wandeling niet vinden.';
  }

  public confirm(): void {
    this.modalRef.hide();
    this.saveToStorageAndGo();
  }

  public decline(): void {
    this.modalRef.hide();
  }

  protected saveToStorageAndGo(): void {
    // Start new walk
    localStorage.clear();

    localStorage.setItem('walk', this.walk.title);
    localStorage.setItem('checkpoints', JSON.stringify(this.walk.checkpoint));

    this.router.navigate(['onderweg']);
  }
}
