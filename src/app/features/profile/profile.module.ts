import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileTemplateComponent } from './profile-template/profile-template.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileTemplateComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
