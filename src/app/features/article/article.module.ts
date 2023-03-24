import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleTemplateComponent } from './article-template/article-template.component';
import { ArticlePageComponent } from './article-page/article-page.component';


@NgModule({
  declarations: [
    ArticleTemplateComponent,
    ArticlePageComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule
  ]
})
export class ArticleModule { }
