import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, take } from 'rxjs';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: AppStore) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated).pipe(take(1));
  }
}
