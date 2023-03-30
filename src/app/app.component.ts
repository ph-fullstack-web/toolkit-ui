import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '@app/store';
import { AuthActions } from '@app/store/auth';
import { RouterOutlet } from '@angular/router';

import { FooterComponent, HeaderComponent } from '@organisms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.populateUser());
  }
}
