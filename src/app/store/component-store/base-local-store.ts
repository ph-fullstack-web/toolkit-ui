import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subscription } from 'rxjs';

import { LocalState, LocalStore, LocalModel, StoreName } from '@app/store/local';

export abstract class BaseLocalStore<TState extends LocalState<LocalModel>, TModel extends LocalModel>
  extends ComponentStore<TState>
  implements LocalStore<TState, TModel>
{
  readonly abstract name: StoreName;

  abstract initializeState(): void;

  readonly localState$: Observable<TState> = this.state$;
  readonly list$: Observable<TModel[]> = this.select((state: TState) => state.list as TModel[]);

  protected subscriptions: Subscription[] = [];

  protected unsubscribeAll(): void {
    this.subscriptions.forEach((subs) => {
      if (!subs.closed) {
        subs.unsubscribe();
      }
    });
  }

  getItem<TResult>(idOrProjector: TModel['id'] | ((state: TState) => TResult)): Observable<TResult | undefined> {
    if (typeof idOrProjector === 'function') {
      return this.select(idOrProjector);
    }

    return this.select((state: TState) => state.list.find((item) => item.id === idOrProjector) as TResult);
  }

  getItemSync(id: TModel['id']): TModel | undefined {
    return this.get((state: TState) => state.list.find((item) => item.id === id) as TModel);
  }

  addItem(model: TModel): Subscription {
    const createSubscription = this.updater((state: TState, item: TModel) => ({
      ...state,
      list: [...state.list, item],
    }));

    return this.executeCommand(createSubscription.bind(this, model));
  }

  updateItem(model: TModel): Subscription {
    const createSubscription = this.updater((state: TState, item: TModel) => {
      const copiedList = state.list.slice();
      const itemIndex = copiedList.indexOf(item);

      copiedList[itemIndex] = item;

      return { ...state, list: copiedList };
    });

    return this.executeCommand(createSubscription.bind(this, model));
  }

  updatePartial(props: Partial<TState>): void | Subscription {
    this.patchState(props);
  }

  deleteItem(id: TModel['id']): Subscription {
    const createSubscription = this.updater((state: TState, id: TModel['id']) => {
      const copiedList = state.list.slice();
      const itemIndex = copiedList.findIndex((item) => item.id === id);

      copiedList.splice(itemIndex, 1);

      return { ...state, list: copiedList };
    });

    return this.executeCommand(createSubscription.bind(this, id));
  }

  protected executeCommand(createSubscription: () => Subscription) {
    const subscription = createSubscription();

    this.subscriptions.push(subscription);

    return subscription;
  }
}
