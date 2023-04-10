import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { JwtService } from '@services';

export const notAuthenticatedUser: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  return typeof jwtService.getToken() !== 'string';
};
