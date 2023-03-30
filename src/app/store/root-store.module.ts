import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthStoreModule } from './auth/auth.store.module';
import { environment } from 'environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [
    AuthStoreModule,
    /**
     * provide `Store` at the root level
     * register initial reducers
     * initialize runtime checks mechanism
     */
    StoreModule.forRoot({}),
    /**
     * to connect NgRx Store with Angular Router.
     */
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    /** 
     * to connect NgRx Store with Redux Devtools extension.
     */
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
})
export class RootStoreModule {}
