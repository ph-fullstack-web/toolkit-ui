import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '@services';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const jwtService = inject(JwtService);
  const headersConfig: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const token = jwtService.getToken();
  if (token) {
    headersConfig['Authorization'] = `Token ${token}`;
  }

  return next(req.clone({ setHeaders: headersConfig }));
};
