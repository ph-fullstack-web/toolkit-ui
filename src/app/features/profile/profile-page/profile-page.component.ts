import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { Profile, User } from 'models';
import { UserService } from 'services';
import { ProfileTemplateComponent } from '../profile-template/profile-template.component';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    standalone: true,
    imports: [ProfileTemplateComponent]
})
export class ProfilePageComponent {
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  profile!: Profile;
  currentUser!: User;
  isUser: boolean = false;

  ngOnInit() {
    this.route.data
      .pipe(
        map((data: any) => data.profile as Profile),
        switchMap((profile: Profile) => {
          this.profile = profile;

          // Load the current user's data.
          return this.userService.currentUser;
        })
      )
      .subscribe((user: User) => {
        this.currentUser = user;
        this.isUser = this.currentUser.username === this.profile?.username;
      });
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
