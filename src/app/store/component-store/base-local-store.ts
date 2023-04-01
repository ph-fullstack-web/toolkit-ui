import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subscription } from 'rxjs';

import { LocalState, LocalStore, LocalModel, StoreName } from '@app/store/local';

export abstract class BaseLocalStore<TModel extends LocalModel>
  extends ComponentStore<LocalState<TModel>>
  implements LocalStore<LocalState<TModel>, TModel>
{
  constructor(initialState: LocalState<TModel>) {
    super(initialState);
  }
  abstract name: StoreName;

  readonly localState$: Observable<LocalState<TModel>> = this.state$;
  readonly list$: Observable<TModel[]> = this.select((state) => state.list);

  protected subscriptions: Subscription[] = [];

  protected unsubscribeAll(): void {
    this.subscriptions.forEach((subs) => {
      if (!subs.closed) {
        subs.unsubscribe();
      }
    });
  }

  getItem(id: TModel['id']): Observable<TModel | undefined> {
    return this.select((state) => state.list.find((item) => item.id === id));
  }

  getItemSync(id: TModel['id']): TModel | undefined {
    return this.get((state) => state.list.find((item) => item.id === id));
  }

  addItem(model: TModel): Subscription {
    const createSubscription = this.updater((state: LocalState<TModel>, item: TModel) => ({
      ...state,
      list: [...state.list, item],
    }));

    return this.executeCommand(createSubscription.bind(this, model));
  }

  updateItem(model: TModel): Subscription {
    const createSubscription = this.updater((state: LocalState<TModel>, item: TModel) => {
      const copiedList = state.list.slice();
      const itemIndex = copiedList.indexOf(item);

      copiedList[itemIndex] = item;

      return { ...state, list: copiedList };
    });

    return this.executeCommand(createSubscription.bind(this, model));
  }

  updatePartial(props: Record<string, unknown>): void {
    this.patchState(props);
  }

  deleteItem(id: TModel['id']): Subscription {
    const createSubscription = this.updater((state: LocalState<TModel>, id: TModel['id']) => {
      const copiedList = state.list.slice();
      const itemIndex = copiedList.findIndex((item) => item.id === id);

      copiedList.splice(itemIndex);

      return { ...state, list: copiedList };
    });

    return this.executeCommand(createSubscription.bind(this, id));
  }

  private executeCommand(createSubscription: () => Subscription) {
    const subscription = createSubscription();

    this.subscriptions.push(subscription);

    return subscription;
  }
}
