import { Injectable, Injector, ConstructorProvider, Type } from '@angular/core';

import { LocalModel, LocalState, LocalStore, ProfileStore, StoreName } from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<
    TState extends LocalState<LocalModel>,
    TModel extends LocalModel,
    TLocalStore extends LocalStore<TState, TModel>
  >(storeName: StoreName): TLocalStore {
    const storeProviders = this.getStoreProviders();
    const injector = Injector.create({
      parent: this.injector,
      providers: storeProviders,
    });

    const stores = storeProviders.map(({ provide }) => injector.get(provide) as TLocalStore);

    return stores.find((store) => store.name === storeName)!;
  }

  private getStoreProviders(): ConstructorProvider[] {
    /** Add derived store class type here.. */
    const storeTypes: Array<Function> = [ProfileStore];

    return storeTypes.map((type) => ({ provide: type as Type<Function> }));
  }
}
