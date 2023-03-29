import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile, User } from 'models';
import { RouterLink } from '@angular/router';
import { FollowButtonComponent } from '../../../shared/components/atoms/follow-button/follow-button.component';

@Component({
    selector: 'app-profile-template',
    templateUrl: './profile-template.component.html',
    standalone: true,
    imports: [FollowButtonComponent, RouterLink]
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
