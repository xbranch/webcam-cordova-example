import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
};

if (environment.production) {
  enableProdMode();
}

if (typeof (window as any).cordova !== 'undefined') {
  document.addEventListener('deviceready', () => bootstrap(), false);
} else {
  bootstrap();
}
