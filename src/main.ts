import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from 'environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { AuthModule, HomeModule } from './app/features';
import { SharedModule } from 'shared/shared.module';
import { CoreModule } from 'core/core.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

const bootstrapPromise = bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, CoreModule, SharedModule, AuthModule, HomeModule, AppRoutingModule)]
});

// Logging bootstrap information
bootstrapPromise.then((success) => console.log(`Bootstrap success`)).catch((err) => console.error(err));
