import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root-state';

import { Errors } from 'models';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../store/auth/auth.actions';
import { authFeature as fromAuth } from '../../../store/auth/auth.reducers';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {
  settingsForm!: UntypedFormGroup;
  errors$!: Observable<Errors | null>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<RootState>, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ['', Validators.required],
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));

    this.store.select(fromAuth.selectCurrentUser).subscribe({
      next: (user) => this.settingsForm.patchValue(user!),
    });

    this.errors$ = this.store.select(fromAuth.selectAttemptAuthErrors);
    this.isLoading$ = this.store.select(fromAuth.selectIsLoading);
  }

  logout() {
    this.store.dispatch(AuthActions.purgeAuth());
  }

  submitForm() {
    // update the model
    const user = this.settingsForm.value;

    this.store.dispatch(AuthActions.updateUser({ user }));
  }
}
