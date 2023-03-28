import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './profile-page/profile-page.component';

import { ProfileArticlesComponent, ProfileFavoritesComponent } from 'organisms';
import { ProfileResolver } from 'resolvers';

const routes: Routes = [
  {
    path: ':username',
    component: ProfilePageComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent,
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
