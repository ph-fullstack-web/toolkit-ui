import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './root-state';
import { fromAuth, AuthEffects } from './auth';
import { UIEffects } from './ui';

export const rootReducerMap: ActionReducerMap<RootState> = {
  [fromAuth.name]: fromAuth.reducer,
};

export const effects = [AuthEffects, UIEffects];

export * from './auth';
export * from './ui';
export * from './root-state';
