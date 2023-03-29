import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FollowButtonComponent, ListErrorsComponent, LoaderComponent, NoResultComponent } from 'atoms';
import { FooterComponent, HeaderComponent } from 'organisms';

import { ShowAuthedDirective } from 'directives';
import { MarkdownPipe } from 'pipes';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];
const components = [
  FollowButtonComponent,
  ListErrorsComponent,
  LoaderComponent,
  NoResultComponent,
  FooterComponent,
  HeaderComponent,
];
const pipes = [MarkdownPipe];
const directives = [ShowAuthedDirective];

@NgModule({
    imports: [...modules, ...components, ...pipes, ...directives, FollowButtonComponent],
    exports: [...modules, ...components, ...pipes, ...directives]
})
export class SharedModule {}
