import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'shared/shared.module';

import { HomePageComponent } from './home-page/home-page.component';
import { HomeTemplateComponent } from './home-template/home-template.component';

import { HomeAuthResolver } from 'resolvers';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomePageComponent, HomeTemplateComponent],
  providers: [HomeAuthResolver],
})
export class HomeModule {}
