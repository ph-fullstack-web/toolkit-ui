import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OnStoreInit } from '@ngrx/component-store';

import { BaseLocalStore, StoreName, IListStore } from '@app/store/local';

export interface ListState<TModel extends { id: string }> {
  currentPage: number;
  itemsPerPage: number;
  searchKey: string;
  listItems: TModel[];
}

export type PaginationMetadata = Array<{
  pageNumber: number;
  isActive: boolean;
}>;

export type PageOptions = {
  searchKey: string;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  paginationMetadata: PaginationMetadata;
};

@Injectable()
export class ListStore<TModel extends { id: string }>
  extends BaseLocalStore<ListState<TModel>>
  implements IListStore<TModel>, OnStoreInit
{
  ngrxOnStoreInit() {
    console.log('On init list store');
  }

  override name: StoreName = 'list';

  override initializeState(): void {
    this.setState({ currentPage: 1, itemsPerPage: 5, listItems: [], searchKey: '' });
  }

  getItem<TResult>(
    idOrProjector: TModel['id'] | ((state: ListState<TModel>) => TResult)
  ): Observable<TResult | undefined> {
    if (typeof idOrProjector === 'function') {
      return this.select(idOrProjector);
    }

    return this.select(
      (state: ListState<TModel>) => state.listItems.find(item => item.id === idOrProjector) as TResult
    );
  }

  get listItemsBySearch$(): Observable<TModel[]> {
    return this.select((state: ListState<TModel>) =>
      state.listItems.filter((item: TModel) =>
        Object.values(item).some(value => {
          const searchKeyFound = value.toString().toLocaleLowerCase().includes(state.searchKey.toLocaleLowerCase());
          return !state.searchKey || searchKeyFound;
        })
      )
    );
  }

  get listItems$(): Observable<TModel[]> {
    return this.select(this.listItemsBySearch$, this.state$, (filteredList, state) => {
      const fromIndex = (state.currentPage - 1) * state.itemsPerPage;
      const toIndex = state.currentPage * state.itemsPerPage;
      return filteredList.slice(fromIndex, toIndex);
    });
  }

  get pageCount$(): Observable<number> {
    return this.select(
      this.listItemsBySearch$,
      this.select((state: ListState<TModel>) => state.itemsPerPage),
      (list, itemsPerPage) => Math.ceil(list.length / itemsPerPage)
    );
  }

  get currentPage$(): Observable<number> {
    return this.select((state: ListState<TModel>) => state.currentPage);
  }

  get isNextDisabled$(): Observable<boolean> {
    return this.select(
      this.pageCount$,
      this.select((state: ListState<TModel>) => state.currentPage),
      (pageCount, currentPage) => currentPage === pageCount
    );
  }

  get searchKey$(): Observable<string> {
    return this.select((state: ListState<TModel>) => state.searchKey);
  }

  get pageOptions$(): Observable<PageOptions> {
    return this.select(
      this.searchKey$,
      this.isPreviousDisabled$,
      this.isNextDisabled$,
      this.paginationMetadata$,
      (searchKey, isPreviousDisabled, isNextDisabled, paginationMetadata) => ({
        searchKey,
        isPreviousDisabled,
        isNextDisabled,
        paginationMetadata,
      })
    );
  }

  get isPreviousDisabled$(): Observable<boolean> {
    return this.select((state: ListState<TModel>) => state.currentPage === 1);
  }

  get paginationMetadata$(): Observable<PaginationMetadata> {
    return this.select(this.pageCount$, this.currentPage$, (pageCount, currentPage) => {
      const metadata: PaginationMetadata = Array.from({ length: pageCount }, (...args: [never, number]) => {
        const [, index] = args;
        const pageNumber = index + 1;
        return { pageNumber, isActive: pageNumber === currentPage };
      });

      return metadata;
    });
  }

  setCurrentPage(currentPage: number): Subscription {
    const createSubscription = this.updater((state: ListState<TModel>, currentPage: number) => ({
      ...state,
      currentPage,
    }));

    return createSubscription(currentPage);
  }

  setItemsPerPage(itemsPerPage: number): Subscription {
    const createSubscription = this.updater((state: ListState<TModel>, itemsPerPage: number) => ({
      ...state,
      itemsPerPage,
    }));

    return createSubscription(itemsPerPage);
  }

  setSearchKey(searchKey: string): Subscription | void {
    this.updatePartial({ searchKey, currentPage: 1 });
  }

  goToNextPage(): void {
    const updateState = this.updater((state: ListState<TModel>) => ({
      ...state,
      currentPage: state.currentPage + 1,
    }));

    return updateState();
  }

  goToPreviousPage(): void {
    const updateState = this.updater((state: ListState<TModel>) => ({
      ...state,
      currentPage: state.currentPage - 1,
    }));

    return updateState();
  }

  addItem(model: TModel): Subscription {
    const createSubscription = this.updater((state: ListState<TModel>, item: TModel) => ({
      ...state,
      listItems: [...state.listItems, item],
    }));

    return createSubscription(model);
  }

  updateItem(id: string, model: Partial<TModel>): Subscription {
    const createSubscription = this.updater(
      (state: ListState<TModel>, args: { id: string; partialModel: Partial<TModel> }) => {
        const itemIndex = state.listItems.findIndex(item => item.id === args.id);
        const item = state.listItems.find(i => i.id === args.id);

        state.listItems[itemIndex] = {
          ...item,
          ...args.partialModel,
        } as TModel;

        return { ...state, list: state.listItems };
      }
    );

    return createSubscription({ id, partialModel: model });
  }

  deleteItem(id: TModel['id']): Subscription {
    const createSubscription = this.updater((state: ListState<TModel>, id: TModel['id']) => {
      const itemIndex = state.listItems.findIndex(item => item.id === id);

      state.listItems.splice(itemIndex, 1);

      return { ...state, list: state.listItems };
    });

    return createSubscription(id);
  }
}
