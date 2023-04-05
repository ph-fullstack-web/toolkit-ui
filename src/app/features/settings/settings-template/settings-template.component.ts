import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Errors } from '@models';
import { ListErrorsComponent } from '@atoms';

@Component({
  selector: 'app-settings-template',
  templateUrl: './settings-template.component.html',
  standalone: true,
  imports: [ListErrorsComponent, FormsModule, ReactiveFormsModule],
})
export class SettingsTemplateComponent {
  @Input() settingsForm!: UntypedFormGroup;
  @Input() errors: Errors = { errors: {} };
  @Input() isSubmitting = false;

  @Output() handleLogout = new EventEmitter();
  @Output() handleSubmitForm = new EventEmitter();

  logout() {
    this.handleLogout.emit();
  }

  submitForm() {
    this.handleSubmitForm.emit();
  }
}
