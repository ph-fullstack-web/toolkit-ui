import { Injectable } from '@angular/core';
import { Observable, Subscription, combineLatest, map, switchMap, tap } from 'rxjs';

import { BaseLocalStore, LocalState, ModelId, StoreName } from '@app/store/local';
import { Consultant } from '@models';

export type ConsultantId = ModelId<string>;
export interface ConsultantLocalModel extends Omit<Consultant, 'consultantId' | 'managerId'> {
  id: ConsultantId;
}
export interface ConsultantState extends LocalState<ConsultantLocalModel> {
  currentPage: number;
  itemsPerPage: number;
  searchKey: string;
  isLoading: boolean;
}

@Injectable()
export class ConsultantStore extends BaseLocalStore<ConsultantState, ConsultantLocalModel> {
  /** Setup reactive state that will listen from the local state prop changes. */
  get #consultantsBySearch$(): Observable<ConsultantLocalModel[]> {
    return this.select((state) =>
      state.list.filter((item) =>
        Object.values(item).some((value) => {
          return !state.searchKey || value.toString().includes(state.searchKey);
        })
      )
    );
  }

  get consultants$(): Observable<ConsultantLocalModel[]> {
    return this.select(this.#consultantsBySearch$, this.state$, (filteredList, state) => {
      const fromIndex = (state.currentPage - 1) * state.itemsPerPage;
      const toIndex = state.currentPage * state.itemsPerPage;
      const list = filteredList.slice(fromIndex, toIndex);
      return list;
    });
  }

  get pageCount$(): Observable<number> {
    return this.select(
      this.#consultantsBySearch$,
      this.select((state) => state.itemsPerPage),
      (list, itemsPerPage) => Math.ceil(list.length / itemsPerPage)
    );
  }

  get currentPage$(): Observable<number> {
    return this.select((state) => state.currentPage);
  }

  get isLoading$(): Observable<boolean> {
    return this.select((state) => state.isLoading);
  }

  get searchKey$(): Observable<string> {
    return this.select((state) => state.searchKey);
  }

  get isPreviousDisabled$(): Observable<boolean> {
    return this.select((state) => state.currentPage === 1);
  }

  get isNextDisabled$(): Observable<boolean> {
    return this.select(
      this.pageCount$,
      this.select((state) => state.currentPage),
      (pageCount, currentPage) => currentPage === pageCount
    );
  }

  override name: StoreName = 'consultant';

  override initializeState(): void {
    this.setState({
      list: [],
      currentPage: 1,
      itemsPerPage: 5,
      searchKey: '',
      isLoading: false,
    });
  }

  /** these methods below will update the local state */

  setCurrentPage(currentPage: number): Subscription {
    const createSubscription = this.updater((state: ConsultantState, currentPage: number) => ({
      ...state,
      currentPage,
    }));

    return this.executeCommand(createSubscription.bind(this, currentPage));
  }

  setItemsPerPage(itemsPerPage: number): Subscription {
    const createSubscription = this.updater((state: ConsultantState, itemsPerPage: number) => ({
      ...state,
      itemsPerPage,
    }));

    return this.executeCommand(createSubscription.bind(this, itemsPerPage));
  }

  setSearchKey(searchKey: string) {
    this.updatePartial({ searchKey, currentPage: 1 });
  }

  goToNextPage = this.updater((state) => ({
    ...state,
    currentPage: state.currentPage + 1,
  }));

  goToPreviousPage = this.updater((state) => ({
    ...state,
    currentPage: state.currentPage - 1,
  }));

  getConsultant(id: ConsultantId): Observable<ConsultantLocalModel | undefined> {
    return this.getItem(id);
  }

  deleteConsultant(id: ConsultantId): Subscription {
    const createSubscription = this.effect((id$: Observable<ConsultantId>) =>
      id$.pipe(
        tap(() => this.updatePartial({ isLoading: true })),
        switchMap((id: ConsultantId) => {
          /** Fake HTTP call to delete consultant. */
          const deleteConsultant$ = new Observable<ConsultantId>((subscriber) => {
            setTimeout(() => {
              subscriber.next(id);
              subscriber.complete();
            }, 1000);
          });

          return deleteConsultant$.pipe(
            tap({
              next: (id) => {
                this.deleteItem(id);
                this.updatePartial({ isLoading: false, currentPage: 1 });
              },
              error: () => this.updatePartial({ isLoading: false }),
            })
          );
        })
      )
    );

    return this.executeCommand(createSubscription.bind(this, id));
  }

  addConsultant(model: ConsultantLocalModel): Subscription {
    const createSubscription = this.effect((model$: Observable<ConsultantLocalModel>) =>
      model$.pipe(
        tap(() => this.updatePartial({ isLoading: true })),
        switchMap((model: ConsultantLocalModel) => {
          /** Fake HTTP call to add consultant. */
          const addConsultant$ = new Observable<ConsultantLocalModel>((subscriber) => {
            setTimeout(() => {
              subscriber.next(model);
              subscriber.complete();
            }, 1000);
          });

          return addConsultant$.pipe(
            tap({
              next: (model) => {
                this.addItem(model);
                this.updatePartial({ isLoading: false, searchKey: '', currentPage: 1 });
              },
              error: () => this.updatePartial({ isLoading: false }),
            })
          );
        })
      )
    );

    return this.executeCommand(createSubscription.bind(this, model));
  }
}
