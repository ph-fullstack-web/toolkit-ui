import { NgModule } from '@angular/core';

import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from 'shared/shared.module';

import { EditorPageComponent } from './editor-page/editor-page.component';
import { EditorTemplateComponent } from './editor-template/editor-template.component';

import { EditableArticleResolver } from 'resolvers';

@NgModule({
  imports: [SharedModule, EditorRoutingModule],
  declarations: [EditorPageComponent, EditorTemplateComponent],
  providers: [EditableArticleResolver],
})
export class EditorModule {}
