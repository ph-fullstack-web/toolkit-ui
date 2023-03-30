import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FollowButtonComponent } from '@atoms';
import { Profile, User } from '@models';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  standalone: true,
  imports: [FollowButtonComponent, RouterLink],
})
export class ProfileTemplateComponent {
  @Input() profile!: Profile;
  @Input() currentUser!: User;
  @Input() isUser: boolean = false;

  @Output() handleToggleFollowing = new EventEmitter<boolean>();

  onToggleFollowing(following: boolean) {
    this.handleToggleFollowing.emit(following);
  }
}
