import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { AppStore } from '@app/store';
import { fromAuth } from '@app/store/auth';
import { Profile, User } from '@models';

import { ProfileTemplateComponent } from '../profile-template/profile-template.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
  imports: [ProfileTemplateComponent, AsyncPipe],
})
export class ProfilePageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: AppStore) {}

  profile$!: Observable<Profile>;
  currentUser$!: Observable<User | null>;
  isUser$!: Observable<boolean>;

  ngOnInit() {
    this.profile$ = this.route.data.pipe(map((data: Data) => data['profile']));
    this.currentUser$ = this.store.select(fromAuth.selectCurrentUser);
    this.isUser$ = combineLatest([this.profile$, this.currentUser$]).pipe(
      map(([profile, currentUser]) => currentUser?.username === profile.username)
    );
  }
}
