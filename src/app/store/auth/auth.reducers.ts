import { createFeature, createReducer, on } from '@ngrx/store';
import { Errors, User } from 'models';
import * as AuthActions from './auth.actions';

export interface State {
  currentUser: User | null;
  attemptAuthErrors: Errors | null;
  isLoading: boolean;
}

const initialState: State = {
  currentUser: null,
  attemptAuthErrors: null,
  isLoading: false,
};

const featureName = 'auth';

export const authFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(AuthActions.attemptAuth, AuthActions.updateUser, AuthActions.populateUser, (state) => {
      console.log(state);
      return { ...state, isLoading: true };
    }),
    on(
      AuthActions.attemptAuthSuccess,
      AuthActions.updateUserSuccess,
      AuthActions.populateUserSuccess,
      (state, payload) => ({
        ...state,
        currentUser: payload.user,
        attemptAuthErrors: null,
        isLoading: false,
      })
    ),
    on(AuthActions.attemptAuthFailure, AuthActions.updateUserFailure, (state, payload) => ({
      ...state,
      currentUser: null,
      attemptAuthErrors: payload.errors,
      isLoading: false,
    })),
    on(AuthActions.purgeAuthSuccess, (state) => ({
      ...state,
      currentUser: null,
      isLoading: false,
    }))
  ),
});

export const { name, reducer, selectAuthState, selectCurrentUser, selectAttemptAuthErrors, selectIsLoading } =
  authFeature;
