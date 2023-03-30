import { createAction, props } from '@ngrx/store';
import { AuthType, Credentials, Errors, User } from 'models';

export const attemptAuth = createAction(
  '[Auth] Attempt Authentication',
  props<{ payload: { credentials: Credentials; authType: AuthType } }>()
);

export const attemptAuthSuccess = createAction('[Auth] Attempt Authentication Success', props<{ user: User }>());

export const attemptAuthFailure = createAction('[Auth] Attempt Authentication Failure', props<{ errors: Errors }>());

export const updateUser = createAction('[Auth] Update User', props<{ user: User }>());

export const updateUserSuccess = createAction('[Auth] Update User Success', props<{ user: User }>());

export const updateUserFailure = createAction('[Auth] Update User Failure', props<{ errors: Errors }>());

export const populateUser = createAction('[Auth] Populate User');

export const populateUserSuccess = createAction('[Auth] Populate User Success', props<{ user: User }>());

export const purgeAuth = createAction('[Auth] Purge User Authentication');

export const purgeAuthSuccess = createAction('[Auth] Purge User Authentication Success');
