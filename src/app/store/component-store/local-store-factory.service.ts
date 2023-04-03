import { Injectable, Injector, ConstructorProvider, Type, Provider } from '@angular/core';

import { LocalModel, LocalState, LocalStore, ProfileStore, StoreName } from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<
    TLocalStore extends LocalStore<TState, TModel>,
    TState extends LocalState<LocalModel> = LocalState<LocalModel>,
    TModel extends LocalModel = LocalModel
  >(storeName: StoreName): TLocalStore {
    const storeProvider = this.getStoreProvider(storeName);
    const injector = Injector.create({
      parent: this.injector,
      //** There should ONLY be 1 local store that needs to be added to DI + the root  */
      providers: [storeProvider],
    });

    const store = injector.get(storeProvider.provide);

    store.initializeState();

    return store;
  }

  private getStoreProvider(storeName: StoreName): ConstructorProvider {
    /** Add store & derived store class type pair in this map.. */
    const storeConstructorMap = new Map<StoreName, Function>([
      ['profile', ProfileStore],
      /** This is a test store */
      ['add-more-here', ProfileStore],
    ]);

    return { provide: storeConstructorMap.get(storeName) as Type<Function> };
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
