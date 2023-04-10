import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { JwtService } from '@services';

export const authenticatedUser: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  return typeof jwtService.getToken() === 'string';
};
