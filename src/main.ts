import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as lottie from 'lottie.js';
// import lottie from 'lottie-web';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// loading element container to transition
const loadingElement = document.querySelector('.app-loading');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    loadingElement.classList.add('loaded');
    lottie.loadAnimation({
      container: document.getElementById('lottie'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // path: 'https://assets3.lottiefiles.com/packages/lf20_ZWEJL5.json'
      path: '/assets/json/loading.json' // the path to the animation json
    });
  })
  .then(() => setTimeout(() => loadingElement.remove(), 4000));
