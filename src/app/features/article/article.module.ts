import { NgModule } from '@angular/core';

import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from 'shared/shared.module';

import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleTemplateComponent } from './article-template/article-template.component';

import { ArticleResolver } from 'resolvers';

@NgModule({
  imports: [SharedModule, ArticleRoutingModule],
  declarations: [ArticlePageComponent, ArticleTemplateComponent],
  providers: [ArticleResolver],
})
export class ArticleModule {}
