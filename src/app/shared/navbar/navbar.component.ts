import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

  public hasWalk(): boolean {
    if ( localStorage.getItem('walk') && localStorage.getItem('checkpoints')) {
      return true;
    }
    return false;
  }

}
