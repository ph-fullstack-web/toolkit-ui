import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
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
