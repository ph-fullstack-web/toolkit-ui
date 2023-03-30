import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ShowAuthedDirective } from '@directives';
import { User } from '@models';
import { UserService } from '@services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, ShowAuthedDirective, RouterLinkActive, NgIf],
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
