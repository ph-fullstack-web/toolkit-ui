import { Injectable } from '@angular/core';

import { BaseLocalStore, ModelId, StoreName } from '@app/store/local';
import { Profile } from '@models';
import { Observable, Subscription, map } from 'rxjs';

export type ProfileId = ModelId<string>;
export interface ProfileLocalModel extends Profile {
  id: ProfileId;
}

@Injectable()
export class ProfileStore extends BaseLocalStore<ProfileLocalModel> {
  constructor() {
    super({ list: [] });

    this.profiles$ = this.state$.pipe(map((state) => state.list));
  }

  profiles$!: Observable<ProfileLocalModel[]>;

  override name: StoreName = 'profile';

  getProfile(id: ProfileId): Observable<ProfileLocalModel | undefined> {
    return this.getItem(id);
  }

  getProfileSync(id: ProfileId): ProfileLocalModel | undefined {
    return this.getItemSync(id);
  }

  addProfile(model: ProfileLocalModel): Subscription {
    return this.addItem(model);
  }

  updateProfile(model: ProfileLocalModel): Subscription {
    return this.updateItem(model);
  }

  deleteProfile(id: ProfileId): Subscription {
    return this.deleteItem(id);
  }
}
