import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root-state';
import { Observable } from 'rxjs';

import { User } from 'models';
import { fromAuth } from 'store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  currentUser$!: Observable<User>;

  ngOnInit() {
    this.currentUser$ = this.store.select(fromAuth.selectCurrentUser) as Observable<User>;
  }
}
