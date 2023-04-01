import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AppStore } from '@app/store';
import { fromAuth, AuthActions } from '@app/store/auth';
import { AuthType, Errors } from '@models';
import { AuthTemplateComponent } from '../auth-template/auth-template.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  imports: [AuthTemplateComponent, AsyncPipe],
})
export class AuthPageComponent {
  authType!: AuthType;
  title: string = '';
  errors$!: Observable<Errors | null>;
  isLoading$!: Observable<boolean>;
  authForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, private store: AppStore, private fb: UntypedFormBuilder) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // you would normally unsubscribe from this observable subscription
    // the active route observables are exemptions from unsubribe always rule
    // see notes on: https://angular.io/guide/router#observable-parammap-and-component-reuse
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path as AuthType;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new UntypedFormControl());
      }
    });

    this.isLoading$ = this.store.select(fromAuth.selectIsLoading);
    this.errors$ = this.store.select(fromAuth.selectAttemptAuthErrors);
  }

  submitForm() {
    this.store.dispatch(
      AuthActions.attemptAuth({ payload: { authType: this.authType, credentials: this.authForm.value } })
    );
  }
}
