import { Component } from '@angular/core';

import { ShowAuthedDirective } from '@directives';

@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  standalone: true,
  imports: [ShowAuthedDirective],
})
export class HomeTemplateComponent {}
