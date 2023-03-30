import { createFeatureSelector, createSelector } from '@ngrx/store';
import { name, State } from './auth.reducers';

export const selectFeature = createFeatureSelector<State>(name);
export const isAuthenticated = createSelector(
  selectFeature,
  (state: State) => !!state.currentUser && !state.attemptAuthErrors
);
