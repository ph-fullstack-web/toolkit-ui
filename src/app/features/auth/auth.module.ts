import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'shared/shared.module';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';

import { NoAuthGuard } from 'guards';

@NgModule({
    imports: [SharedModule, AuthRoutingModule, AuthPageComponent, AuthTemplateComponent],
    providers: [NoAuthGuard]
})
export class AuthModule {}
