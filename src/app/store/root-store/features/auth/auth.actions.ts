import { createAction, props } from '@ngrx/store';
import { AttemptAuthPayload, AttemptAuthError, UserPayload } from '@models';

export const attemptAuth = createAction('[Auth] Attempt Authentication', props<{ payload: AttemptAuthPayload }>());

export const attemptAuthSuccess = createAction('[Auth] Attempt Authentication Success', props<UserPayload>());

export const attemptAuthFailure = createAction('[Auth] Attempt Authentication Failure', props<AttemptAuthError>());

export const updateUser = createAction('[Auth] Update User', props<UserPayload>());

export const updateUserSuccess = createAction('[Auth] Update User Success', props<UserPayload>());

export const updateUserFailure = createAction('[Auth] Update User Failure', props<AttemptAuthError>());

export const populateUser = createAction('[Auth] Populate User');

export const populateUserSuccess = createAction('[Auth] Populate User Success', props<UserPayload>());

export const purgeAuth = createAction('[Auth] Purge User Authentication');

export const purgeAuthSuccess = createAction('[Auth] Purge User Authentication Success');
