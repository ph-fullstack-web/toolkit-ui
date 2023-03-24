import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    HomeTemplateComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
