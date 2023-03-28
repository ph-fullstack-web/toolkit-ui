import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { HomeAuthResolver } from 'resolvers';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: {
      isAuthenticated: HomeAuthResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
