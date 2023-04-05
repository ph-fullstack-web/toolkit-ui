import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  standalone: true,
})
export class NoResultComponent {
  @Input() hidden = false;
  @Input() message = 'No Result Found';
}
