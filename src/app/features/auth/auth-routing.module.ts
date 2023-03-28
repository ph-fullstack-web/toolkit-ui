import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page/auth-page.component';

import { NoAuthGuard } from 'guards';

const routes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    component: AuthPageComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
