import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from 'models';
import { ArticlesService } from 'services';

@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private articlesService: ArticlesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articlesService.get(route.params['slug']).pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
