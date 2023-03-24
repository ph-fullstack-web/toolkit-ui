import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FavoriteButtonComponent, LoaderComponent, NoResultComponent } from 'atoms';
import { ArticleCommentComponent, ArticleMetaComponent, FooterComponent, HeaderComponent } from 'molecules';
import { ArticleListComponent, ArticlePreviewComponent } from 'organisms';

import { ShowAuthedDirective } from 'directives';
import { MarkdownPipe } from 'pipes';

const modules = [CommonModule, FormsModule, ReactiveFormsModule];
const components = [
  FavoriteButtonComponent,
  LoaderComponent,
  NoResultComponent,
  ArticleCommentComponent,
  ArticleMetaComponent,
  FooterComponent,
  HeaderComponent,
  ArticleListComponent,
  ArticlePreviewComponent,
];
const pipes = [MarkdownPipe];
const directives = [ShowAuthedDirective];

@NgModule({
  declarations: [...components, ...pipes, ...directives],
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
})
export class SharedModule {}
