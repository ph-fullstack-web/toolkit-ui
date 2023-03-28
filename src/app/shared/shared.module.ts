import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FavoriteButtonComponent, ListErrorsComponent, LoaderComponent, NoResultComponent } from 'atoms';
import { ArticleCommentComponent, ArticleMetaComponent, FooterComponent, HeaderComponent } from 'molecules';
import {
  ArticleListComponent,
  ArticlePreviewComponent,
  ProfileArticlesComponent,
  ProfileFavoritesComponent,
} from 'organisms';

import { ShowAuthedDirective } from 'directives';
import { MarkdownPipe } from 'pipes';
import { FollowButtonComponent } from './components/atoms/follow-button/follow-button.component';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];
const components = [
  FavoriteButtonComponent,
  ListErrorsComponent,
  LoaderComponent,
  NoResultComponent,
  ArticleCommentComponent,
  ArticleMetaComponent,
  FooterComponent,
  HeaderComponent,
  ArticleListComponent,
  ArticlePreviewComponent,
  ProfileArticlesComponent,
  ProfileFavoritesComponent,
];
const pipes = [MarkdownPipe];
const directives = [ShowAuthedDirective];

@NgModule({
  declarations: [...components, ...pipes, ...directives, FollowButtonComponent],
  imports: [...modules],
  exports: [...modules, ...components, ...pipes, ...directives],
})
export class SharedModule {}
