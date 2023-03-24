import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss'],
})
export class NoResultComponent {
  @Input() resultCount!: number;
  @Input() message: string = 'No Result Found';
}
