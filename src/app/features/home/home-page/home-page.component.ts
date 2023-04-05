import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, map } from 'rxjs';

import { HomeTemplateComponent } from '../home-template/home-template.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  standalone: true,
  imports: [HomeTemplateComponent],
})
export class HomePageComponent {
  constructor(private route: ActivatedRoute) {}

  isAuthenticated$!: Observable<boolean>;

  ngOnInit() {
    this.isAuthenticated$ = this.route.data.pipe(
      map((data: Data) => data['isAuthenticated'])
    );
  }
}
