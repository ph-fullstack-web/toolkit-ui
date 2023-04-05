import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthError, Errors, User } from '@models';
import { AuthActions } from '@app/store/auth';

export interface State {
  currentUser: User | null;
  authErrors: Errors | null;
  isLoading: boolean;
}

const initialState: State = {
  currentUser: null,
  authErrors: null,
  isLoading: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(
      AuthActions.attemptAuth,
      AuthActions.updateUser,
      AuthActions.populateUser,
      (state: State) => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      AuthActions.attemptAuthSuccess,
      AuthActions.updateUserSuccess,
      AuthActions.populateUserSuccess,
      (state, payload) => ({
        ...state,
        currentUser: payload.user,
        authErrors: null,
        isLoading: false,
      })
    ),
    on(
      AuthActions.attemptAuthFailure,
      AuthActions.updateUserFailure,
      (state: State, payload: AuthError) => ({
        ...state,
        currentUser: null,
        authErrors: payload.errors,
        isLoading: false,
      })
    ),
    on(AuthActions.purgeAuthSuccess, (state: State) => ({
      ...state,
      currentUser: null,
      isLoading: false,
    }))
  ),
});

export const {
  name: featureName,
  reducer,
  selectAuthState,
  selectCurrentUser,
  selectAuthErrors,
  selectIsLoading,
} = authFeature;
