import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [RouterLink, DatePipe],
})
export class FooterComponent {
  today: number = Date.now();
}
