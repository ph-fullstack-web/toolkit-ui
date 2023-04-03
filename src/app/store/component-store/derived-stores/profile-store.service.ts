import { Injectable } from '@angular/core';
import { Observable, Subscription, combineLatest, map, switchMap, tap } from 'rxjs';

import { BaseLocalStore, LocalState, ModelId, StoreName } from '@app/store/local';
import { Profile } from '@models';

export type ProfileId = ModelId<string>;

export interface ProfileLocalModel extends Profile {
  id: ProfileId;
}

export interface State extends LocalState<ProfileLocalModel> {
  selectedId: string;
}

/**
 * This is a test store to demonstrate the class relationship and implementation.
 */
@Injectable()
export class ProfileStore extends BaseLocalStore<State, ProfileLocalModel> {
  profiles$: Observable<ProfileLocalModel[]> = this.state$.pipe(map((state) => state.list));

  override name: StoreName = 'profile';

  override initializeState(): void {
    this.setState({ list: [], selectedId: '' });
  }

  getSelectedItem(): Observable<ProfileLocalModel> {
    return combineLatest([this.list$, this.select((state) => state.selectedId)]).pipe(
      map(([list, selectedId]) => list.find((item) => item.id === selectedId)!)
    );
  }

  getProfile(id: ProfileId): Observable<ProfileLocalModel | undefined> {
    return this.getItem(id);
  }

  getProfileSync(id: ProfileId): ProfileLocalModel | undefined {
    return this.getItemSync(id);
  }

  addProfile(model: ProfileLocalModel): Subscription {
    const createSubs = this.effect((model$: Observable<ProfileLocalModel>) => {
      return model$.pipe(
        switchMap((model: ProfileLocalModel) => {
          /** Fake HTTP call to add profile. */
          const addProfile$ = new Observable<ProfileLocalModel>((subscriber) => {
            setTimeout(() => {
              subscriber.next(model);
              subscriber.complete();
            }, 1000);
          });

          return addProfile$.pipe(tap((model: ProfileLocalModel) => this.addItem(model)));
        })
      );
    });
    const subs = createSubs(model);

    this.subscriptions.push(subs);

    return subs;
  }

  updateProfile(model: ProfileLocalModel): Subscription {
    return this.updateItem(model);
  }

  deleteProfile(id: ProfileId): Subscription {
    return this.deleteItem(id);
  }
}
