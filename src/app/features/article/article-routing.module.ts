import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlePageComponent } from './article-page/article-page.component';

import { ArticleResolver } from 'resolvers';

const routes: Routes = [
  {
    path: ':slug',
    component: ArticlePageComponent,
    resolve: {
      article: ArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
