import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AppStore } from '@app/store';
import { fromAuth, AuthActions } from '@app/store/auth';
import { AuthType, Errors } from '@models';
import { AuthTemplateComponent } from '../auth-template/auth-template.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  imports: [AuthTemplateComponent, AsyncPipe, NgIf],
})
export class AuthPageComponent {
  authType$!: Observable<AuthType>;
  title$!: Observable<string>;
  errors$!: Observable<Errors | null>;
  isLoading$!: Observable<boolean>;
  authForm!: UntypedFormGroup;

  constructor(private route: ActivatedRoute, private store: AppStore, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.initializeForm();
    this.initializeObservables();
  }

  submitForm(authType: AuthType) {
    this.store.dispatch(AuthActions.attemptAuth({ payload: { authType, credentials: this.authForm.value } }));
  }

  private initializeObservables() {
    this.authType$ = this.route.url.pipe(
      map((data: UrlSegment[]) => data[data.length - 1].path as AuthType),
      tap((authType: AuthType) => {
        if (authType === 'register') {
          this.authForm.addControl('username', new UntypedFormControl());
        }
      })
    );
    this.title$ = this.authType$.pipe(map((authType: AuthType) => (authType === 'login' ? 'Sign in' : 'Sign up')));
    this.isLoading$ = this.store.select(fromAuth.selectIsLoading);
    this.errors$ = this.store.select(fromAuth.selectAuthErrors);
  }

  private initializeForm() {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
