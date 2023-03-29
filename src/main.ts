import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from 'environments/environment';
import { AppComponent } from './app/app.component';
import { SharedModule } from 'shared/shared.module';
import { CoreModule } from 'core/core.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from 'app/app.routes';

if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, CoreModule, SharedModule),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
  ],
});

// Logging bootstrap information
bootstrapPromise.then((success) => console.log(`Bootstrap success`)).catch((err) => console.error(err));
