import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { environment } from '@environments/environment';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from 'app/app.routes';
import { RootStoreModule } from '@app/store';

if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, CoreModule, RootStoreModule),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
  ],
});

// Logging bootstrap information
bootstrapPromise.then((success) => console.log(`Bootstrap success`)).catch((err) => console.error(err));
