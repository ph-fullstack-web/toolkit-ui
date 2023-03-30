import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthSelectors } from 'store/auth';
import { RootState } from 'app/store/root-state';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store<RootState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated).pipe(
      take(1),
      map((isAuth: boolean) => !isAuth)
    );
  }
}
