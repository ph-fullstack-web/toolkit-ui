import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from 'models';
import { ArticlesService } from 'services';
import { of } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from 'store';
import { AuthSelectors } from 'store/auth';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  constructor(private articlesService: ArticlesService, private router: Router, private store: Store<RootState>) {}

  @Input()
  article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
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

          // Favorite the article if it isn't favorited yet
          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfavorite the article
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
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
