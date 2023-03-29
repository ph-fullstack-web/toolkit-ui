import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'shared/shared.module';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileTemplateComponent } from './profile-template/profile-template.component';

import { ProfileResolver } from 'resolvers';

@NgModule({
    imports: [SharedModule, ProfileRoutingModule, ProfilePageComponent, ProfileTemplateComponent],
    providers: [ProfileResolver]
})
export class ProfileModule {}
