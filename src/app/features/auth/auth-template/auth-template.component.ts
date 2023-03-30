import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { ListErrorsComponent } from '@atoms';
import { Errors } from '@models';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  standalone: true,
  imports: [NgIf, RouterLink, ListErrorsComponent, FormsModule, ReactiveFormsModule],
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
