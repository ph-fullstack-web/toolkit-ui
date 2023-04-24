import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { Profile } from '@models';
import { ProfilesService } from '@services';

export const profileResolver: ResolveFn<Profile> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const profilesService = inject(ProfilesService);

  return profilesService.get(route.params['name']).pipe(tap({ error: () => router.navigateByUrl('/') }));
};
