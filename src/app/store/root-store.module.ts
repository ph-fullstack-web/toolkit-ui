import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthStoreModule } from './auth/auth.store.module';
import { environment } from 'environments/environment';

@NgModule({
  imports: [
    AuthStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  ],
})
export class RootStoreModule {}
