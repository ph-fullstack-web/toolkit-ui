import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomeTemplateComponent } from '../home-template/home-template.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [HomeTemplateComponent],
})
export class HomePageComponent {
  constructor(private route: ActivatedRoute) {}

  isAuthenticated: boolean = false;

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.isAuthenticated = data.isAuthenticated as boolean;
    });
  }
}
