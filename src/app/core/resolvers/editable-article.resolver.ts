import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from 'models';
import { ArticlesService, UserService } from 'services';

@Injectable()
export class EditableArticleResolver implements Resolve<Article> {
  constructor(private articlesService: ArticlesService, private router: Router, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(
      map((article: Article) => {
        if (this.userService.getCurrentUser().username === article.author.username) {
          return article;
        }
        this.router.navigateByUrl('/');
        return;
      }),
      catchError((err) => this.router.navigateByUrl('/'))
    );
  }
}
