import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WalksComponent } from './walks.component';
import { WalkComponent } from './walk/walk.component';

export const walkRoutes: Routes = [
  { path: '', component: WalksComponent },
  { path: ':slug', component: WalkComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(walkRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class WalkRoutingModule {}
