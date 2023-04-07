import { ClassProvider, FactoryProvider } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export interface LocalState<TModel extends { id: string }> {
  list: TModel[];
}

/** Add store names as literal types */
export type StoreName = 'profile' | 'consultant' | 'add-more-here';

export interface LocalStore<TState extends LocalState<TModel>, TModel extends { id: string }> {
  readonly localState$: Observable<TState>;
  readonly list$: Observable<TModel[]>;

  readonly name: StoreName;

  initializeState(): void;
  getItem<TResult>(id: TModel['id'] | ((s: TState) => TResult)): Observable<TResult | undefined>;
  addItem(model: TModel): Subscription | void;
  updateItem(model: TModel): Subscription | void;
  updatePartial(props: Partial<TState>): Subscription | void;
  deleteItem(id: TModel['id']): Subscription | void;
}

export type LocalStoreProviders = [ClassProvider, FactoryProvider];
