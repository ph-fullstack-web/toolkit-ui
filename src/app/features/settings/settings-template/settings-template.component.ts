import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Errors } from 'models';

@Component({
  selector: 'app-settings-template',
  templateUrl: './settings-template.component.html',
})
export class SettingsTemplateComponent {
  @Input() settingsForm!: UntypedFormGroup;
  @Input() errors: Errors = { errors: {} };
  @Input() isSubmitting: boolean = false;

  @Output() handleLogout = new EventEmitter();
  @Output() handleSubmitForm = new EventEmitter();

  logout() {
    this.handleLogout.emit();
  }

  submitForm() {
    this.handleSubmitForm.emit();
  }
}
