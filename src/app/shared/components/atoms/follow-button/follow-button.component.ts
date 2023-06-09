import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';
import { Profile } from '@models';
import { ProfilesService } from '@services';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  standalone: true,
  imports: [NgClass],
})
export class FollowButtonComponent {
  constructor(private profilesService: ProfilesService, private router: Router, private store: AppStore) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.store
      .select(AuthSelectors.isAuthenticated)
      .pipe(
        exhaustMap(authenticated => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Follow this profile if we aren't already
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                () => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                () => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfollow this profile
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                () => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                () => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();
  }
}
