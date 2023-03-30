import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors } from '@models';
import { UserService } from '@services';

import { AuthTemplateComponent } from '../auth-template/auth-template.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  standalone: true,
  imports: [AuthTemplateComponent],
})
export class AuthPageComponent {
  authType: string = '';
  title: string = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  authForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: UntypedFormBuilder
  ) {
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
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new UntypedFormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data) => this.router.navigateByUrl('/'),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
