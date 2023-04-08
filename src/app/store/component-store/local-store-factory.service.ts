import { Injectable, Injector, Provider } from '@angular/core';

import {
  LocalStore,
  LocalStoreName,
  LocalStoreProviders,
  SharedStoreName,
  StoreName,
  provideConsultantStore,
  provideListStore,
} from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<TLocalStore extends LocalStore>(localStoreName: LocalStoreName): TLocalStore {
    /**
     * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
     * the localStoreProviders & sharedStoreNameProviders array contain:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS token to call the useFactory and execute the hooks.
     */
    const localStoreProviders = this.getStoreProviders(localStoreName);
    const [localProvider] = localStoreProviders;
    /** map & get ALL shared/common stores that can be injected into local stores. */
    const sharedStoreProviders = this.sharedStoreNames.map(name => this.getSharedStoreProviders(name));
    const injector = Injector.create({
      parent: this.injector,
      /**
       * There should ONLY be 1 local store that will be added to DI + the root (parent injector).
       * plus shared/common stores
       */
      providers: [localStoreProviders, ...sharedStoreProviders],
    });
    const localStore = injector.get<TLocalStore>(localProvider.useClass);

    /** initialize local store state */
    localStore.initializeState();

    /** loop through shared/common store providers & initialize state */
    for (const [sharedProvider] of sharedStoreProviders)
      injector.get<TLocalStore>(sharedProvider.useClass).initializeState();

    return localStore;
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
