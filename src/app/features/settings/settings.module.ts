import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'shared/shared.module';

import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsTemplateComponent } from './settings-template/settings-template.component';

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: [SettingsPageComponent, SettingsTemplateComponent],
})
export class SettingsModule {}
