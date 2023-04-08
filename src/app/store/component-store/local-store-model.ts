import { ClassProvider, FactoryProvider } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

/** Add shared store names as literal types */
export type SharedStoreName = 'list';
/** Add store names as literal types */
export type StoreName = SharedStoreName | 'profile' | 'consultant' | 'add-more-here';

export type LocalStoreProviders = [ClassProvider, FactoryProvider];

export interface LocalStore<TState extends object = object> {
  readonly localState$: Observable<TState>;

  readonly name: StoreName;

  setState(stateOrUpdaterFn: TState | ((state: TState) => TState)): void;
  initializeState(): void;
  updatePartial(props: Partial<TState>): Subscription | void;
}
