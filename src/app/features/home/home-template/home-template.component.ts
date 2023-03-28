import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleListConfig } from 'models';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
})
export class HomeTemplateComponent {
  @Input() listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };
  @Input() tags: Array<string> = [];
  @Input() tagsLoaded = false;

  @Output() handleSetListTo = new EventEmitter<{
    type: string;
    filters: Object;
  }>();

  setListTo(type: string = '', filters: Object = {}) {
    this.handleSetListTo.emit({
      type,
      filters,
    });
  }
}
