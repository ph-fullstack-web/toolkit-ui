import { Injectable, Injector, Provider } from '@angular/core';

import {
  LocalStore,
  LocalStoreProviders,
  SharedStoreName,
  StoreName,
  provideConsultantStore,
  provideListStore,
} from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<TLocalStore extends LocalStore>(storeName: StoreName): TLocalStore {
    const storeProviders = this.getStoreProviders(storeName);
    /**
     * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
     * the localStoreProviders array contains:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS token to call the useFactory and execute the hooks.
     */
    const [provider] = storeProviders;
    /** map & get ALL shared/common stores that can be injected into local stores. */
    const sharedStoreNameProviders = this.sharedStoreNames.map(name => this.getSharedStoreProviders(name));
    const injector = Injector.create({
      parent: this.injector,
      /**
       * There should ONLY be 1 local store that will be added to DI + the root (parent injector).
       * plus shared/common stores
       */
      providers: [storeProviders, ...sharedStoreNameProviders],
    });
    const store = injector.get<TLocalStore>(provider.useClass);

    /** initialize local store state */
    store.initializeState();

    /** initialize shared/common stores state */
    sharedStoreNameProviders.forEach(storeProviders => {
      const [sharedProvider] = storeProviders;
      const sharedStore = injector.get<TLocalStore>(sharedProvider.useClass);
      sharedStore.initializeState();
    });

    return store;
  }

  private get sharedStoreNames(): SharedStoreName[] {
    /** add shared stores here */
    return ['list'];
  }

  private getStoreProviders(storeName: StoreName): LocalStoreProviders {
    const providersMap = new Map<StoreName, Provider[]>([
      // ['profile', provideProfileStore()],
      ['consultant', provideConsultantStore()],
    ]);

    return providersMap.get(storeName) as LocalStoreProviders;
  }

  private getSharedStoreProviders(storeName: SharedStoreName): LocalStoreProviders {
    const providersMap = new Map<SharedStoreName, Provider[]>([['list', provideListStore()]]);

    return providersMap.get(storeName) as LocalStoreProviders;
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
