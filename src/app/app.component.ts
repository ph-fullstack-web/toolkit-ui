import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'store';
import { AuthActions } from 'store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.populateUser());
  }
}
