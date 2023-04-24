import { Routes } from '@angular/router';

import { notAuthenticatedUser } from '@guards';
import { authResolver, profileResolver } from '@resolvers';
import { provideLocalStoreFactory } from '@app/store/local';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home-page/home-page.component').then(mod => mod.HomePageComponent),
    resolve: {
      isAuthenticated: authResolver,
    },
  },
  {
    path: 'local-store',
    loadComponent: () =>
      import('./features/local-store-example/local-store-example-page/local-store-example-page.component').then(
        mod => mod.LocalStoreExamplePageComponent
      ),
    providers: [provideLocalStoreFactory()],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/auth-page/auth-page.component').then(mod => mod.AuthPageComponent),
    canActivate: [notAuthenticatedUser],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/auth-page/auth-page.component').then(mod => mod.AuthPageComponent),
    canActivate: [notAuthenticatedUser],
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings-page/settings-page.component').then(mod => mod.SettingsPageComponent),
  },
  {
    path: 'profile/:name',
    loadComponent: () =>
      import('./features/profile/profile-page/profile-page.component').then(mod => mod.ProfilePageComponent),
    resolve: {
      profile: profileResolver,
    },
  },
];
