import { Component, OnInit } from '@angular/core';

import { UserService } from 'services';
import { FooterComponent } from './shared/components/organisms/layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/organisms/layout/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
  }
}
