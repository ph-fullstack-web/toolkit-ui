import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { Errors } from 'models';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
})
export class AuthTemplateComponent {
  @Input() title!: string;
  @Input() authType!: string;
  @Input() errors: Errors = { errors: {} };
  @Input() authForm!: UntypedFormGroup;
  @Input() isSubmitting: boolean = false;

  @Output() handleSubmitForm = new EventEmitter();

  submitForm() {
    this.handleSubmitForm.emit();
  }
}
