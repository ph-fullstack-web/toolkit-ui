import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Article, User, Comment } from 'models';

@Component({
  selector: 'app-article-template',
  templateUrl: './article-template.component.html',
})
export class ArticleTemplateComponent {
  @Input() article!: Article;
  @Input() currentUser!: User;
  @Input() canModify: boolean = false;
  @Input() comments: Comment[] = [];
  @Input() commentControl = new UntypedFormControl();
  @Input() commentFormErrors = { errors: {} };
  @Input() isSubmitting = false;
  @Input() isDeleting = false;

  @Output() handleDeleteArticle = new EventEmitter();
  @Output() handleAddComment = new EventEmitter();
  @Output() handleDeleteComment = new EventEmitter<Comment>();
  @Output() handleToggleFavorite = new EventEmitter<boolean>();
  @Output() handleToggleFollowing = new EventEmitter<boolean>();

  deleteArticle() {
    this.handleDeleteArticle.emit();
  }

  addComment() {
    this.handleAddComment.emit();
  }

  onDeleteComment(comment: Comment) {
    this.handleDeleteComment.emit(comment);
  }

  onToggleFavorite(favorited: boolean) {
    this.handleToggleFavorite.emit(favorited);
  }

  onToggleFollowing(following: boolean) {
    this.handleToggleFollowing.emit(following);
  }
}
