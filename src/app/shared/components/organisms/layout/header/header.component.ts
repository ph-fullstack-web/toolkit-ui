import { Component, OnInit } from '@angular/core';
import { AppStore } from '@app/store';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { fromAuth } from '@app/store/auth';
import { ShowAuthedDirective } from '@directives';
import { User } from '@models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, ShowAuthedDirective, RouterLinkActive, NgIf, AsyncPipe],
})
export class HeaderComponent implements OnInit {
  constructor(private store: AppStore) {}

  currentUser$!: Observable<User>;

  ngOnInit() {
    this.currentUser$ = this.store.select(
      fromAuth.selectCurrentUser
    ) as Observable<User>;
  }
}
