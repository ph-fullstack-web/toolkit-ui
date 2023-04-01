import { Store } from '@ngrx/store';
import { RootState } from './root-state';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStore extends Store<RootState> {}
