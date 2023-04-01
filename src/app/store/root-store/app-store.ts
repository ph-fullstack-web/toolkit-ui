import { Store } from '@ngrx/store';
import { Injectable, Provider } from '@angular/core';

import { RootState } from './root-state';

@Injectable()
export class AppStore extends Store<RootState> {}

export const provideAppStore = (): Provider => AppStore;
