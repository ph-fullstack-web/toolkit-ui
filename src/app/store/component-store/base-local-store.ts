import { ComponentStore } from '@ngrx/component-store';
import { Observable, Subscription } from 'rxjs';

import { LocalStore, StoreName } from '@app/store/local';

export abstract class BaseLocalStore<TState extends object>
  extends ComponentStore<TState>
  implements LocalStore<TState>
{
  abstract readonly name: StoreName;

  abstract initializeState(): void;

  readonly localState$: Observable<TState> = this.state$;

  override setState(stateOrUpdaterFn: TState | ((state: TState) => TState)): void {
    return super.setState(stateOrUpdaterFn);
  }

  protected subscriptions: Subscription[] = [];

  protected unsubscribeAll(): void {
    this.subscriptions.forEach(subs => {
      if (!subs.closed) {
        subs.unsubscribe();
      }
    });
  }

  protected executeCommand(createSubscription: () => Subscription) {
    const subscription = createSubscription();

    this.subscriptions.push(subscription);

    return subscription;
  }

  selectStateProperty<Result>(projector: (state: TState) => Result): Observable<Result> {
    return this.select(projector);
  }

  updatePartial(props: Partial<TState>): void | Subscription {
    this.patchState(props);
  }
}
