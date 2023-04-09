import { Observable, Subscription } from 'rxjs';

import { ListState, PageOptions, PaginationMetadata, LocalStore } from '@app/store/local';

export interface IListStore<TModel extends { id: string }> extends LocalStore {
  get listItems$(): Observable<TModel[]>;
  get pageCount$(): Observable<number>;
  get currentPage$(): Observable<number>;
  get isNextDisabled$(): Observable<boolean>;
  get searchKey$(): Observable<string>;
  get pageOptions$(): Observable<PageOptions>;
  get isPreviousDisabled$(): Observable<boolean>;
  get paginationMetadata$(): Observable<PaginationMetadata>;

  getItem<TResult>(
    idOrProjector: TModel['id'] | ((state: ListState<TModel>) => TResult)
  ): Observable<TResult | undefined>;
  updatePartial(props: Partial<ListState<TModel>>): void | Subscription;
  setCurrentPage(currentPage: number): Subscription;
  setItemsPerPage(itemsPerPage: number): Subscription;
  setSearchKey(searchKey: string): Subscription | void;
  goToNextPage(): void;
  goToPreviousPage(): void;
  addItem(model: TModel): Subscription;
  updateItem(id: string, model: Partial<TModel>): Subscription;
  deleteItem(id: TModel['id']): Subscription;
}
