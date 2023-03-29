import { Component, OnInit } from '@angular/core';

import { User } from 'models';
import { UserService } from 'services';
import { NgIf } from '@angular/common';
import { ShowAuthedDirective } from '../../../../directives/show-authed.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterLink, ShowAuthedDirective, RouterLinkActive, NgIf]
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser!: User;

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
