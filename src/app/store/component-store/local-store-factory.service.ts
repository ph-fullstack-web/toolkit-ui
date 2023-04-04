import { Injectable, Injector, Type, Provider } from '@angular/core';

import { ConsultantStore, LocalModel, LocalState, LocalStore, ProfileStore, StoreName } from '@app/store/local';
import { provideComponentStore } from '@ngrx/component-store';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<
    TLocalStore extends LocalStore<TState, TModel>,
    TState extends LocalState<LocalModel> = LocalState<LocalModel>,
    TModel extends LocalModel = LocalModel
  >(storeName: StoreName): TLocalStore {
    const storeType = this.getStoreType<TLocalStore>(storeName);
    const injector = Injector.create({
      parent: this.injector,
      /** There should ONLY be 1 local store that will be added to DI + the root (parent injector). */
      providers: [provideComponentStore(storeType as Type<any>)],
    });

    const store = injector.get(storeType);

    store.initializeState();

    return store;
  }

  private getStoreType<TLocalStore>(storeName: StoreName): Type<TLocalStore> {
    const storeConstructorMap = new Map<StoreName, Function>([
      /** Map store name & derived store class type pair below.. */
      ['profile', ProfileStore],
      ['consultant', ConsultantStore],
    ]);

    return storeConstructorMap.get(storeName) as Type<TLocalStore>;
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
