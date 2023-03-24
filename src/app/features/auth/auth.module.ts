import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    AuthTemplateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
