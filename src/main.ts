import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { CoreModule } from '@core/core.module';
import { environment } from '@environments/environment';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from 'app/app.routes';
import { rootReducerMap, effects, RootState } from '@app/store';

if (environment.production) {
  enableProdMode();
}

provideEffects();
const bootstrapPromise = bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, CoreModule),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),

    /** ngrx related providers */
    provideStore<RootState>(rootReducerMap),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: environment.production }),
    provideEffects(...effects),
  ],
});

// Logging bootstrap information
bootstrapPromise.then((success) => console.log(`Bootstrap success`)).catch((err) => console.error(err));
