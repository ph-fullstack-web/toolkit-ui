import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'app/store/root-state';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { fromAuth } from '@app/store/auth';
import { ShowAuthedDirective } from '@directives';
import { User } from '@models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, ShowAuthedDirective, RouterLinkActive, NgIf, CommonModule],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<RootState>) {}

  currentUser$!: Observable<User>;

  ngOnInit() {
    this.currentUser$ = this.store.select(fromAuth.selectCurrentUser) as Observable<User>;
  }
}