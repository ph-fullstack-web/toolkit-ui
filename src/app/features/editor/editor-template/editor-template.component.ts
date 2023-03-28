import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Article, Errors } from 'models';

@Component({
  selector: 'app-editor-template',
  templateUrl: './editor-template.component.html',
})
export class EditorTemplateComponent {
  @Input() article: Article = {} as Article;
  @Input() articleForm!: UntypedFormGroup;
  @Input() tagField = new UntypedFormControl();
  @Input() errors: Errors = { errors: {} };
  @Input() isSubmitting = false;

  @Output() handleSubmitForm = new EventEmitter();
  @Output() handleAddTag = new EventEmitter();
  @Output() handleRemoveTag = new EventEmitter<string>();

  submitForm() {
    this.handleSubmitForm.emit();
  }

  addTag() {
    this.handleAddTag.emit();
  }

  removeTag(tagName: string) {
    this.handleRemoveTag.emit(tagName);
  }
}
