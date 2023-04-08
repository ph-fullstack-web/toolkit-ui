import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';
import { tokenInterceptor } from '@interceptors';
import { rootReducerMap, effects, RootState, provideAppStore } from '@app/store';

import { APP_ROUTES } from 'app/app.routes';
import { provideAppInitializers } from 'app/app-init-providers';
import { AppComponent } from 'app/app.component';

if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideAppInitializers(),

    /** ngrx related providers */
    provideAppStore(),
    provideStore<RootState>(rootReducerMap),
    provideRouterStore(),
    provideStoreDevtools({ logOnly: environment.production }),
    provideEffects(...effects),
  ],
});

// Logging bootstrap information
bootstrapPromise.then(() => console.log(`Bootstrap success`)).catch(err => console.error(err));
