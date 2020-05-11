import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private titleService: Title,
    private device: DeviceService,
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
    if (this.device.getBrowserData() !== undefined){
      return this.device.getBrowserData().mobile;
    }
    return false;
  }

  public startWalking(): void {
    // Save checkpoints to localStorage
    localStorage.setItem('key', 'Value');
  }

}
