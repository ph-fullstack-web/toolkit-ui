import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppStore } from '@app/store';
import { AuthSelectors } from '@app/store/auth';

@Injectable({
  providedIn: 'root',
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private store: AppStore) {}

  resolve(): Observable<boolean> {
    return this.store.select(AuthSelectors.isAuthenticated).pipe(take(1));
  }
}
