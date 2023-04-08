import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { AppStore, AuthActions } from '@app/store';

function initializeLoggedInUser(): () => void {
  const store = inject(AppStore);
  return () => store.dispatch(AuthActions.populateUser());
}

//** Add initializer functions here. */

export function provideAppInitializers(): FactoryProvider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLoggedInUser,
      multi: true,
    },
  ];
}
