import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { Errors, User } from '@models';
import { ApiService, JwtService } from '@services';
import { AuthActions } from '@app/store/auth';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  attemptAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.attemptAuth),
        map((action) => action.payload),
        exhaustMap((payload) => {
          const authType = payload.authType;
          const path = authType === 'register' ? '' : authType;

          return this.apiService.post(`/users/${path}`, { user: payload.credentials }).pipe(
            tap((data) => this.jwtService.saveToken(data.user.token)),
            map((data) => AuthActions.attemptAuthSuccess({ user: data.user })),
            catchError((errors: Errors) => of(AuthActions.attemptAuthFailure({ errors })))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  attemptAuthSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.attemptAuthSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  populateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.populateUser),
        exhaustMap(() => {
          if (!this.jwtService.getToken()) {
            return of(AuthActions.purgeAuth());
          }

          return this.apiService.get('/user').pipe(
            map((data) => AuthActions.populateUserSuccess({ user: data.user })),
            catchError(() => of(AuthActions.purgeAuth()))
          );
        })
      ),
    { useEffectsErrorHandler: false }
  );

  purgeAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.purgeAuth),
      tap(() => this.jwtService.destroyToken()),
      map(() => AuthActions.purgeAuthSuccess())
    )
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUser),
        exhaustMap(({ user }) =>
          this.apiService.put('/user', { user }).pipe(
            map((data: { user: User }) => AuthActions.updateUserSuccess({ user: data.user })),
            catchError((errors: Errors) => of(AuthActions.updateUserFailure({ errors })))
          )
        )
      ),
    { useEffectsErrorHandler: false }
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.updateUserSuccess),
        tap(({ user }) => {
          this.router.navigateByUrl(`/profile/${user.username}`);
        })
      ),
    { dispatch: false }
  );
}
