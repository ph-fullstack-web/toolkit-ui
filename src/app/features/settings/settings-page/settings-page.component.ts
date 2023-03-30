import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable, take } from 'rxjs';

import { RootState } from '@app/store';
import { AuthActions, fromAuth } from '@app/store/auth';
import { Errors } from '@models';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  standalone: true,
  imports: [SettingsTemplateComponent, AsyncPipe],
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

    this.store
      .select(fromAuth.selectCurrentUser)
      .pipe(take(1))
      .subscribe({
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
