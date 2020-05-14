import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as lottie from 'src/js/lottie.js';
// import lottie from 'lottie-web';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// loading element container to transition
const loadingElement = document.querySelector('.app-loading');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    loadingElement.classList.add('loaded');
    lottie.loadAnimation({
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/json/loading.json'
    });
  })
  .then(() => setTimeout(() => loadingElement.remove(), 2000))
  .catch(err => console.error(err));
