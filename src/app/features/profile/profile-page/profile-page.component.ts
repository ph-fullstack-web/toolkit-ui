import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Profile, User } from 'models';
import { RootState } from 'store';
import { fromAuth } from 'store/auth';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent {
  constructor(private route: ActivatedRoute, private store: Store<RootState>) {}

  profile$!: Observable<Profile>;
  currentUser$!: Observable<User | null>;
  isUser$!: Observable<boolean>;

  ngOnInit() {
    this.profile$ = this.route.data.pipe(map((data: Data) => data['profile'] as Profile));
    this.currentUser$ = this.store.select(fromAuth.selectCurrentUser);
    this.isUser$ = combineLatest([this.profile$, this.currentUser$]).pipe(
      map(([profile, currentUser]) => currentUser?.username === profile!.username)
    );
  }
}
