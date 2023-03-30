import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AuthModule, HomeModule } from './features';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootStoreModule } from 'store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, SharedModule, AuthModule, HomeModule, AppRoutingModule, RootStoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
