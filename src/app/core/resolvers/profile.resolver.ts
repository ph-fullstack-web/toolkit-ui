import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Profile } from '@models';
import { ProfilesService } from '@services';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profilesService: ProfilesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Profile> {
    return this.profilesService.get(route.params['name']).pipe(tap({ error: () => this.router.navigateByUrl('/') }));
  }
}
