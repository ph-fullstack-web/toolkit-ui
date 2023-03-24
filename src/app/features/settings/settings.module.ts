import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsTemplateComponent } from './settings-template/settings-template.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';


@NgModule({
  declarations: [
    SettingsTemplateComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
