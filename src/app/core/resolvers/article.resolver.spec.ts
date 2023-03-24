import { TestBed } from '@angular/core/testing';

import { ArticleResolver } from './article.resolver';

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ArticleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
