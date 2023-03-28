import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPageComponent } from './editor-page/editor-page.component';

import { AuthGuard } from 'guards';
import { EditableArticleResolver } from 'resolvers';

const routes: Routes = [
  {
    path: '',
    component: EditorPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':slug',
    component: EditorPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
