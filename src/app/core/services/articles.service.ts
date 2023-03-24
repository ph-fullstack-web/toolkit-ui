import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ArticleListConfig, Article } from 'models';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  query({ type, filters }: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams

    return this.apiService.get(
      '/articles' + (type === 'feed' ? '/feed' : ''),
      new HttpParams({ fromObject: { ...filters } })
    );
  }

  get(slug: string): Observable<Article> {
    return this.apiService.get('/articles/' + slug).pipe(map((data) => data.article));
  }

  destroy(slug: string) {
    return this.apiService.delete('/articles/' + slug);
  }

  save(article: { slug: string }): Observable<Article> {
    // If we're updating an existing article
    if (article.slug) {
      return this.apiService.put('/articles/' + article.slug, { article: article }).pipe(map((data) => data.article));

      // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', { article: article }).pipe(map((data) => data.article));
    }
  }

  favorite(slug: string): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}
