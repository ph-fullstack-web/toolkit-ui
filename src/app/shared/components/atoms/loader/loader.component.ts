import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    standalone: true
})
export class LoaderComponent {
  @Input() message: string = 'Loading...';
  @Input() loading: boolean = false;
}
