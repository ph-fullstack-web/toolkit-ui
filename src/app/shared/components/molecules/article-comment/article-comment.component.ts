import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User, Comment } from 'models';
import { UserService } from 'services';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  private subscription: Subscription = new Subscription();

  @Input()
  comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;

  ngOnInit() {
    //TODO: move subscription to page
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe((userData: User) => {
      this.canModify = userData.username === this.comment.author.username;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
