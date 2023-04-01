import { ActionReducerMap } from '@ngrx/store';
import { RootState } from './root-state';
import { fromAuth, AuthEffects } from './features/auth';
import { UIEffects } from './features/ui';

export * from './features/';
export * from './app-store';
export * from './root-state';

export const rootReducerMap: ActionReducerMap<RootState> = {
  [fromAuth.featureName]: fromAuth.reducer,
};

export const effects = [AuthEffects, UIEffects];
