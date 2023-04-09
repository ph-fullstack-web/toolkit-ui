import { ClassProvider, FactoryProvider } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

/** Add shared store names as literal types */
export type SharedStoreName = 'list';
/** Add store names as literal types */
export type StoreName = SharedStoreName | 'profile' | 'consultant' | 'add-more-here';
/** remove all shared store name literal types from local store name literal types */
export type LocalStoreName = Exclude<StoreName, SharedStoreName>;
/**
 * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
 * the LocalStoreProviders array type contains:
 * [0] - provider for the local store
 * [1] - provider for CS_WITH_HOOKS token to call the useFactory and execute the hooks.
 */
export type LocalStoreProviders = [ClassProvider, FactoryProvider];

export interface LocalStore<TState extends object = object> {
  readonly localState$: Observable<TState>;
  readonly name: StoreName;

  selectStateProperty<Result>(projector: (state: TState) => Result): Observable<Result>;
  setState(stateOrUpdaterFn: TState | ((state: TState) => TState)): void;
  initializeState(): void;
  updatePartial(props: Partial<TState>): Subscription | void;
}
