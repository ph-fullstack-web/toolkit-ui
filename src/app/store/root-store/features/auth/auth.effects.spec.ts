import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthActions, AuthEffects, RootState } from '@app/store';
import { AttemptAuthPayload, Errors, User, UserResponse } from '@models';
import { ApiService, JwtService } from '@services';

describe('AuthEffects', () => {
  let effects!: AuthEffects;
  let actions$ = new Observable<Action>();
  let testScheduler: TestScheduler;

  const jwtServiceStub = jasmine.createSpyObj<JwtService>('jwt service', ['saveToken', 'getToken', 'destroyToken']);
  const apiServiceStub = jasmine.createSpyObj<ApiService>('api service', ['post', 'get', 'put']);
  const routerStub = jasmine.createSpyObj<Router>('router', ['navigateByUrl']);
  const initialState: RootState = {
    auth: {
      authErrors: null,
      currentUser: {} as User,
      isLoading: false,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideMockStore<RootState>({
          initialState,
        }),
        { provide: JwtService, useValue: jwtServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ApiService, useValue: apiServiceStub },
      ],
    });

    effects = TestBed.inject<AuthEffects>(AuthEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('attemptAuth$', () => {
    it('should emit attempAuthSuccess action', (done: DoneFn) => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const action = AuthActions.attemptAuth({ payload: {} as AttemptAuthPayload });
        const userResponse: UserResponse = {
          user: {} as User,
        };
        apiServiceStub.post.and.returnValue(cold('--a', { a: userResponse }));
        actions$ = hot('-a', { a: action });

        expectObservable(effects.attemptAuth$).toBe('---a', {
          a: AuthActions.attemptAuthSuccess({
            user: userResponse.user,
          }),
        });

        done();
      });
    });

    it('should emit attemptAuthFailure action', (done: DoneFn) => {
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const action = AuthActions.attemptAuth({ payload: {} as AttemptAuthPayload });
        const errors: Errors = {
          errors: {
            error: 'Test error',
          },
        };

        apiServiceStub.post.and.returnValue(cold('#', undefined, errors));
        actions$ = hot('-b', { b: action });

        expectObservable(effects.attemptAuth$).toBe('-b', {
          b: AuthActions.attemptAuthFailure({
            errors,
          }),
        });

        done();
      });
    });
  });
});
