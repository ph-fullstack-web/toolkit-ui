import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { take } from 'rxjs/operators';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';

export const authResolver: ResolveFn<boolean> = () => {
  const store = inject(AppStore);

  return store.select(AuthSelectors.isAuthenticated).pipe(take(1));
};
