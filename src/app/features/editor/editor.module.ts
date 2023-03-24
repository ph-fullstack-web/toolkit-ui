import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorPageComponent } from './editor-page/editor-page.component';
import { EditorTemplateComponent } from './editor-template/editor-template.component';


@NgModule({
  declarations: [
    EditorPageComponent,
    EditorTemplateComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
