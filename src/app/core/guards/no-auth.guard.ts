import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private store: AppStore) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated).pipe(
      take(1),
      map((isAuth: boolean) => !isAuth)
    );
  }
}
