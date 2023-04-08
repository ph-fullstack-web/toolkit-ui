import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { AppStore, AuthActions } from '@app/store';

function initializeApp(): () => void {
  const store = inject(AppStore);
  return () => store.dispatch(AuthActions.populateUser());
}

export function provideAppInitializers(): FactoryProvider[] {
  return [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
    },
  ];
}
