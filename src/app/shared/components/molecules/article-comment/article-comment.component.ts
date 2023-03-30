import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Comment } from 'models';
import { fromAuth } from 'store/auth';
import { RootState } from 'store';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  constructor(private store: Store<RootState>) {}

  private subscription: Subscription = new Subscription();

  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;

  ngOnInit() {
    // Load the current user's data

    this.subscription = this.store.select(fromAuth.selectCurrentUser).subscribe((userData) => {
      this.canModify = userData?.username === this.comment.author.username;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }
}
