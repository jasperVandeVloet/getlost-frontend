import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { WalksComponent } from './pages/walks/walks.component';
import { walkRoutes } from './pages/walks/walks-routing.module';
import { NavigationComponent } from './pages/navigation/navigation.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'wandelingen', children: walkRoutes },
  { path: 'onderweg', component: NavigationComponent /* page should only be accessible via mobile */ },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
