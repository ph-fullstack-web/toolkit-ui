import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
})
export class NoResultComponent {
  @Input() hidden: boolean = false;
  @Input() message: string = 'No Result Found';
}
