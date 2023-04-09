import { Provider } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ListStore } from '@app/store/local';

export function provideListStore(): Provider[] {
  return provideComponentStore(ListStore);
}
