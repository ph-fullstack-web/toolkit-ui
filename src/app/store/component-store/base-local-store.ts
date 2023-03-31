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

  getItem(id: TModel['id']): Observable<TModel | undefined> {
    return this.select((state) => state.list.find((item) => item.id === id));
  }

  getItemSync(id: TModel['id']): TModel | undefined {
    return this.get((state) => state.list.find((item) => item.id === id));
  }

  addItem = this.updater((state: LocalState<TModel>, item: TModel) => ({
    ...state,
    list: [...state.list, item],
  }));

  updateItem = this.updater((state: LocalState<TModel>, item: TModel) => {
    const copiedList = state.list.slice();
    const itemIndex = copiedList.indexOf(item);

    copiedList[itemIndex] = item;

    return { list: copiedList };
  });

  updatePartial(props: Record<string, unknown>): void | Subscription {
    this.patchState(props);
  }

  deleteItem = this.updater((state: LocalState<TModel>, id: TModel['id']) => {
    const copiedList = state.list.slice();
    const itemIndex = copiedList.findIndex((item) => item.id === id);

    copiedList.splice(itemIndex);

    return { list: copiedList };
  });
}
