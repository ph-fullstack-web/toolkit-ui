import { Provider } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';

import { ConsultantStore } from './consultant-store.service';

export function provideConsultantStore(): Provider[] {
  return provideComponentStore(ConsultantStore);
}
