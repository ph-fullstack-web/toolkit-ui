import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ValueProvider } from '@angular/core';
import { HttpTokenInterceptor } from './http-token.interceptor';

export * from './http-token.interceptor';

export function provideInterceptors(): ValueProvider[] {
  return [HttpTokenInterceptor].map(type => ({
    provide: HTTP_INTERCEPTORS,
    useValue: type,
    multi: true,
  }));
}
