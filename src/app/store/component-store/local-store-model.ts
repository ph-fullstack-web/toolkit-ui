import { Observable, Subscription } from 'rxjs';

export type ModelId<TypeID> = TypeID;

export interface LocalModel extends Record<string, any> {
  id: ModelId<string>;
}

export interface LocalState<TModel extends LocalModel> {
  list: TModel[];
}

/** Add store names as literal types */
export type StoreName = 'profile' | 'consultant' | 'add-more-here';

export interface LocalStore<
  TState extends LocalState<LocalModel>,
  TModel extends LocalModel
> {
  readonly localState$: Observable<TState>;
  readonly list$: Observable<TModel[]>;

  readonly name: StoreName;

  initializeState(): void;
  getItem<TResult>(
    id: TModel['id'] | ((s: TState) => TResult)
  ): Observable<TResult | undefined>;
  addItem(model: TModel): Subscription | void;
  updateItem(model: TModel): Subscription | void;
  updatePartial(props: Partial<TState>): Subscription | void;
  deleteItem(id: TModel['id']): Subscription | void;
}
