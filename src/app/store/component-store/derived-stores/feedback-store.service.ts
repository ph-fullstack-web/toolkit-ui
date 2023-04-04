import { Injectable } from '@angular/core';
import { Observable, Subscription, combineLatest, map, switchMap, tap } from 'rxjs';

import { BaseLocalStore, LocalState, ModelId, StoreName } from '@app/store/local';
import { Feedback } from '@models';

export type FeedbackId = ModelId<string>;
export interface FeedbackLocalModel extends Omit<Feedback, 'feedbackId' | 'managerId'> {
  id: FeedbackId;
}
export interface FeedbackState extends LocalState<FeedbackLocalModel> {
  currentPage: number;
  itemsPerPage: number;
  searchKey: string;
  isLoading: boolean;
}

@Injectable()
export class FeedbackStore extends BaseLocalStore<FeedbackState, FeedbackLocalModel> {
  /** Setup reactive state that will listen from the local state prop changes. */
  get #feedbacksBySearch$(): Observable<FeedbackLocalModel[]> {
    return this.select((state) =>
      state.list.filter((item) =>
        Object.values(item).some((value) => {
          return !state.searchKey || value.toString().includes(state.searchKey);
        })
      )
    );
  }

  get feedbacks$(): Observable<FeedbackLocalModel[]> {
    return this.select(this.#feedbacksBySearch$, this.state$, (filteredList, state) => {
      const fromIndex = (state.currentPage - 1) * state.itemsPerPage;
      const toIndex = state.currentPage * state.itemsPerPage;
      const list = filteredList.slice(fromIndex, toIndex);
      return list;
    });
  }

  get pageCount$(): Observable<number> {
    return this.select(
      this.#feedbacksBySearch$,
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

  override name: StoreName = 'feedback';

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
    const createSubscription = this.updater((state: FeedbackState, currentPage: number) => ({
      ...state,
      currentPage,
    }));

    return this.executeCommand(createSubscription.bind(this, currentPage));
  }

  setItemsPerPage(itemsPerPage: number): Subscription {
    const createSubscription = this.updater((state: FeedbackState, itemsPerPage: number) => ({
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

  getFeedback(id: FeedbackId): Observable<FeedbackLocalModel | undefined> {
    return this.getItem(id);
  }

  deleteFeedback(id: FeedbackId): Subscription {
    const createSubscription = this.effect((id$: Observable<FeedbackId>) =>
      id$.pipe(
        tap(() => this.updatePartial({ isLoading: true })),
        switchMap((id: FeedbackId) => {
          /** Fake HTTP call to delete consultant. */
          const deleteFeedback$ = new Observable<FeedbackId>((subscriber) => {
            setTimeout(() => {
              subscriber.next(id);
              subscriber.complete();
            }, 1000);
          });

          return deleteFeedback$.pipe(
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

  addFeedback(model: FeedbackLocalModel): Subscription {
    const createSubscription = this.effect((model$: Observable<FeedbackLocalModel>) =>
      model$.pipe(
        tap(() => this.updatePartial({ isLoading: true })),
        switchMap((model: FeedbackLocalModel) => {
          /** Fake HTTP call to add consultant. */
          const addConsultant$ = new Observable<FeedbackLocalModel>((subscriber) => {
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
