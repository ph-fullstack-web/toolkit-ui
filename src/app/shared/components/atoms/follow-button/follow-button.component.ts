import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Profile } from 'models';
import { ProfilesService } from 'services';
import { RootState } from 'store';
import { AuthSelectors } from 'store/auth';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
})
export class FollowButtonComponent {
  constructor(private profilesService: ProfilesService, private router: Router, private store: Store<RootState>) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;

    this.store
      .select(AuthSelectors.isAuthenticated)
      .pipe(
        exhaustMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Follow this profile if we aren't already
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfollow this profile
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();
  }
}
