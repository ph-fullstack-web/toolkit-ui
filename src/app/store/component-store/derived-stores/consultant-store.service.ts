import { Injectable } from '@angular/core';
import { Observable, Subscription, exhaustMap, filter, tap } from 'rxjs';
import { provideComponentStore, tapResponse } from '@ngrx/component-store';

import { BaseLocalStore, LocalState, StoreName } from '@app/store/local';
import { Consultant } from '@models';

export interface ConsultantLocalModel extends Omit<Consultant, 'consultantId' | 'managerId'> {
  id: string;
  isDeleting?: boolean;
}
export interface ConsultantState extends LocalState<ConsultantLocalModel> {
  currentPage: number;
  itemsPerPage: number;
  searchKey: string;
  isLoading: boolean;
}

export type PaginationMetadata = Array<{
  pageNumber: number;
  isActive: boolean;
}>;

@Injectable()
export class ConsultantStore extends BaseLocalStore<ConsultantState, ConsultantLocalModel> {
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

  getConsultant(id: string): Observable<ConsultantLocalModel | undefined> {
    return this.getItem(id);
  }

  /** reactive getter methods that will listen to local state prop changes. */

  get #consultantsBySearch$(): Observable<ConsultantLocalModel[]> {
    return this.select((state: ConsultantState) =>
      state.list.filter((item: ConsultantLocalModel) =>
        Object.values(item).some((value: unknown[]) => {
          return !state.searchKey || value.toString().includes(state.searchKey);
        })
      )
    );
  }

  get consultants$(): Observable<ConsultantLocalModel[]> {
    return this.select(this.#consultantsBySearch$, this.state$, (filteredList, state) => {
      const fromIndex = (state.currentPage - 1) * state.itemsPerPage;
      const toIndex = state.currentPage * state.itemsPerPage;
      return filteredList.slice(fromIndex, toIndex);
    });
  }

  get pageCount$(): Observable<number> {
    return this.select(
      this.#consultantsBySearch$,
      this.select((state: ConsultantState) => state.itemsPerPage),
      (list, itemsPerPage) => Math.ceil(list.length / itemsPerPage)
    );
  }

  get currentPage$(): Observable<number> {
    return this.select((state: ConsultantState) => state.currentPage);
  }

  get isLoading$(): Observable<boolean> {
    return this.select((state: ConsultantState) => state.isLoading);
  }

  get searchKey$(): Observable<string> {
    return this.select((state: ConsultantState) => state.searchKey);
  }

  get isPreviousDisabled$(): Observable<boolean> {
    return this.select((state: ConsultantState) => state.currentPage === 1);
  }

  get isNextDisabled$(): Observable<boolean> {
    return this.select(
      this.pageCount$,
      this.select((state: ConsultantState) => state.currentPage),
      (pageCount, currentPage) => currentPage === pageCount
    );
  }

  get paginationMetadata$(): Observable<PaginationMetadata> {
    return this.select(this.pageCount$, this.currentPage$, (pageCount, currentPage) => {
      const metadata: PaginationMetadata = [];

      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        metadata.push({
          isActive: pageNum === currentPage,
          pageNumber: pageNum,
        });
      }

      return metadata;
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

  goToNextPage = this.updater((state: ConsultantState) => ({
    ...state,
    currentPage: state.currentPage + 1,
  }));

  goToPreviousPage = this.updater((state: ConsultantState) => ({
    ...state,
    currentPage: state.currentPage - 1,
  }));

  deleteConsultant(id: string): Subscription {
    const createSubscription = this.effect((id$: Observable<string>) =>
      id$.pipe(
        tap(() => this.updatePartial({ isLoading: true })),
        exhaustMap((id: string) => {
          /** Fake HTTP call to delete consultant. */
          const deleteConsultant$ = new Observable<string>(subscriber => {
            setTimeout(() => {
              subscriber.next(id);
              subscriber.complete();
            }, 1000);
          });

          return this.getItem<ConsultantLocalModel>(id).pipe(
            filter(model => !!model),
            tap(model => {
              (model as ConsultantLocalModel).isDeleting = true;
            }),
            exhaustMap(() => {
              return deleteConsultant$.pipe(
                tapResponse(
                  (id: string) => {
                    this.deleteItem(id);
                    this.updatePartial({
                      isLoading: false,
                      currentPage: 1,
                    });
                  },
                  () => {
                    this.updatePartial({
                      isLoading: false,
                    });
                  }
                )
              );
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
        exhaustMap((model: ConsultantLocalModel) => {
          /** Fake HTTP call to add consultant. */
          const addConsultant$ = new Observable<ConsultantLocalModel>(subscriber => {
            setTimeout(() => {
              subscriber.next(model);
              subscriber.complete();
            }, 1000);
          });

          return addConsultant$.pipe(
            tapResponse(
              (model: ConsultantLocalModel) => {
                this.addItem(model);
                this.updatePartial({
                  isLoading: false,
                  searchKey: '',
                  currentPage: 1,
                });
              },
              () => this.updatePartial({ isLoading: false })
            )
          );
        })
      )
    );

    return this.executeCommand(createSubscription.bind(this, model));
  }
}

export function provideConsultantStore() {
  return provideComponentStore(ConsultantStore);
}
