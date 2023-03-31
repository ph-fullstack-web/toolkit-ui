import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromAuth } from '@app/store/auth';

export const selectFeature = createFeatureSelector<fromAuth.State>(fromAuth.featureName);
export const isAuthenticated = createSelector(
  selectFeature,
  (state: fromAuth.State) => !!state.currentUser && !state.attemptAuthErrors
);
