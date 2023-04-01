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
    const storeProviders = this.getStoreProviders();
    const injector = Injector.create({
      parent: this.injector,
      providers: storeProviders,
    });

    const stores = storeProviders.map(({ provide }) => injector.get(provide) as TLocalStore);
    const store = stores.find((store) => store.name === storeName)!;

    store.initializeState();

    return store;
  }

  private getStoreProviders(): ConstructorProvider[] {
    /** Add derived store class type here.. */
    const storeTypes: Array<Function> = [ProfileStore];

    return storeTypes.map((type) => ({ provide: type as Type<Function> }));
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
