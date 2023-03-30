import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import * as fromAuth from './auth.reducers';

@NgModule({
  imports: [StoreModule.forFeature(fromAuth.authFeature), EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule {}
