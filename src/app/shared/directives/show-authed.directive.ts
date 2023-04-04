import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';

@Directive({
  selector: '[appShowAuthed]',
  standalone: true,
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private store: AppStore,
    private viewContainer: ViewContainerRef
  ) {}

  private condition = false;

  ngOnInit() {
    this.store.select(AuthSelectors.isAuthenticated).subscribe((isAuthenticated: boolean) => {
      if ((isAuthenticated && this.condition) || (!isAuthenticated && !this.condition)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  get appShowAuthed(): boolean {
    return this.condition;
  }
}
