import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Errors, User } from 'models';
import { UserService } from 'services';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    standalone: true,
    imports: [SettingsTemplateComponent]
})
export class SettingsPageComponent {
  user: User = {} as User;
  settingsForm: UntypedFormGroup;
  errors: Errors = { errors: {} };
  isSubmitting = false;

  constructor(private router: Router, private userService: UserService, private fb: UntypedFormBuilder) {
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
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe(
      (updatedUser) => this.router.navigateByUrl('/profile/' + updatedUser.username),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }
}
