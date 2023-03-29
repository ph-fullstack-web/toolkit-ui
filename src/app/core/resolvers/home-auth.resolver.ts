import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserService } from 'services';

@Injectable({
  providedIn: 'root'
})
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
