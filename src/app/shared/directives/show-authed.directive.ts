import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthSelectors } from 'store/auth';
import { RootState } from 'app/store/root-state';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private store: Store<RootState>,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean | undefined;

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
}
