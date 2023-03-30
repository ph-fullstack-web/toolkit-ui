import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthSelectors } from 'store/auth';
import { RootState } from 'store';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private store: Store<RootState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated).pipe(take(1));
  }
}
