import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Article } from 'models';
import { ArticlesService } from 'services';
import { RootState } from 'store';
import { fromAuth } from 'store/auth';

@Injectable()
export class EditableArticleResolver implements Resolve<Article> {
  constructor(private articlesService: ArticlesService, private router: Router, private store: Store<RootState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(
      switchMap((article: Article) =>
        this.store.select(fromAuth.selectCurrentUser).pipe(
          map((user) => {
            if (user!.username === article.author.username) return article;

            return this.router.navigateByUrl('/');
          })
        )
      ),
      catchError(() => this.router.navigateByUrl('/'))
    );
  }
}
