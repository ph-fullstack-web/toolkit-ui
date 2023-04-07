import { Injectable } from '@angular/core';
import { Observable, Subscription, exhaustMap, tap } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';

import { BaseLocalStore, LocalState, StoreName } from '@app/store/local';
import { Profile } from '@models';

export interface ProfileLocalModel extends Profile {
  id: string;
}

export interface State extends LocalState<ProfileLocalModel> {
  selectedId: string;
}

/**
 * This is a test store to demonstrate the class relationship and implementation.
 */
@Injectable()
export class ProfileStore extends BaseLocalStore<State, ProfileLocalModel> {
  profiles$: Observable<ProfileLocalModel[]> = this.select(state => state.list);

  override name: StoreName = 'profile';

  override initializeState(): void {
    this.setState({ list: [], selectedId: '' });
  }

  getSelectedItem(): Observable<ProfileLocalModel> {
    return this.select(state => state.list.find(i => i.id === state.selectedId) as ProfileLocalModel);
  }

  getProfile(id: string): Observable<ProfileLocalModel | undefined> {
    return this.getItem(id);
  }

  addProfile(model: ProfileLocalModel): Subscription {
    const createSubscription = this.effect((model$: Observable<ProfileLocalModel>) =>
      model$.pipe(
        exhaustMap((model: ProfileLocalModel) => {
          /** Fake HTTP call to add profile. */
          const addProfile$ = new Observable<ProfileLocalModel>(subscriber => {
            setTimeout(() => {
              subscriber.next(model);
              subscriber.complete();
            }, 1000);
          });

          return addProfile$.pipe(tap((model: ProfileLocalModel) => this.addItem(model)));
        })
      )
    );

    return this.executeCommand(createSubscription.bind(this, model));
  }

  updateProfile(model: ProfileLocalModel): Subscription {
    return this.updateItem(model);
  }

  deleteProfile(id: string): Subscription {
    return this.deleteItem(id);
  }
}

export function provideProfileStore() {
  return provideComponentStore(ProfileStore);
}
