import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { Ng5SliderModule } from 'ng5-slider';
import { AnQrcodeModule } from 'an-qrcode';
import { ShowdownModule } from 'ngx-showdown';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { WalksComponent } from './pages/walks/walks.component';
import { WalkComponent } from './pages/walks/walk/walk.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { DifficultyRatingComponent } from './components/difficulty-rating/difficulty-rating.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { CheckpointModalComponent } from './components/checkpoint-modal/checkpoint-modal.component';
import { FinishModalComponent } from './components/finish-modal/finish-modal.component';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';
import { ParallaxDirective } from './directives/parallax.directive';

// Note we need a separate function as it's required
// by the AOT compiler. Lottie
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    WalksComponent,
    WalkComponent,
    FooterComponent,
    LoaderComponent,
    DifficultyRatingComponent,
    NavigationComponent,
    CheckpointModalComponent,
    FinishModalComponent,
    HowItWorksComponent,
    ParallaxDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
    ReactiveFormsModule,
    Ng5SliderModule,
    AnQrcodeModule,
    ShowdownModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
