import { Inject, Injectable } from '@angular/core';
import { Observable, Subscription, exhaustMap, filter, tap } from 'rxjs';
import { OnStoreInit, tapResponse } from '@ngrx/component-store';

import { BaseLocalStore, IConsultantStore, IListStore, LIST_STORE_TOKEN, StoreName } from '@app/store/local';
import { Consultant } from '@models';

export interface ConsultantLocalModel extends Omit<Consultant, 'consultantId' | 'managerId'> {
  id: string;
  isDeleting?: boolean;
}
export interface ConsultantState {
  isLoading: boolean;
}

@Injectable()
export class ConsultantStore extends BaseLocalStore<ConsultantState> implements IConsultantStore, OnStoreInit {
  constructor(@Inject(LIST_STORE_TOKEN) public readonly listStore: IListStore<ConsultantLocalModel>) {
    super();
  }

  ngrxOnStoreInit() {
    console.log('On init consultant store');
  }

  override name: StoreName = 'consultant';

  override initializeState(): void {
    this.setState({
      isLoading: false,
    });
  }

  getConsultant(id: string): Observable<ConsultantLocalModel | undefined> {
    return this.listStore.getItem(id);
  }

  /** reactive getter methods that will listen to local state prop changes. */

  readonly consultants$: Observable<ConsultantLocalModel[]> = this.listStore.listItems$;

  get isLoading$(): Observable<boolean> {
    return this.select((state: ConsultantState) => state.isLoading);
  }

  /** these methods below will update the local state */

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

          return this.listStore.getItem<ConsultantLocalModel>(id).pipe(
            filter(model => !!model),
            tap(model => {
              (model as ConsultantLocalModel).isDeleting = true;
            }),
            exhaustMap(() =>
              deleteConsultant$.pipe(
                tapResponse(
                  (id: string) => {
                    this.listStore.deleteItem(id);
                    this.updatePartial({
                      isLoading: false,
                    });
                    this.listStore.updatePartial({ searchKey: '', currentPage: 1 });
                  },
                  () => {
                    this.updatePartial({
                      isLoading: false,
                    });
                  }
                )
              )
            )
          );
        })
      )
    );

    return this.executeCommand(createSubscription.bind(this, id));
  }

  updateConsultant(id: string, model: Partial<ConsultantLocalModel>): Subscription {
    return this.listStore.updateItem(id, model);
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
                this.listStore.addItem(model);
                this.updatePartial({
                  isLoading: false,
                });
                this.listStore.updatePartial({ searchKey: '', currentPage: 1 });
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
