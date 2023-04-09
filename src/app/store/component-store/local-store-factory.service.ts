import { Injectable, InjectionToken, Injector, Provider } from '@angular/core';

import {
  LIST_STORE_TOKEN,
  LocalStore,
  LocalStoreName,
  LocalStoreProviders,
  SharedStoreName,
  StoreName,
  provideConsultantStore,
  provideListStore,
} from '@app/store/local';

export type CreateInstanceOptions = {
  sharedStores: SharedStoreName[];
};

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  /**
   * method that creates instance of {@link TLocalStore} then initializes the store state.
   * @param localStoreName string literal type for local store name {@link LocalStoreName}
   * @param {Object} options - configuration options for creating instance.
   * @param {Array<SharedStoreName>} options.sharedStores - shared stores that will be injected to returned {@link LocalStoreName}
   * @returns instance of local store.
   */
  createInstance<TLocalStore extends LocalStore>(
    localStoreName: LocalStoreName,
    options?: CreateInstanceOptions
  ): TLocalStore {
    /**
     * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
     * the localStoreProviders & sharedStoreNameProviders arrays contain:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS token to call the useFactory and execute the hooks.
     */
    const localStoreProviders = this.getLocalStoreProviders(localStoreName);
    const [localProvider] = localStoreProviders;
    const sharedStoreNames = options?.sharedStores ?? [];
    /** map & get ALL shared/common stores that can be injected into local stores. */
    const sharedStoreProviders = sharedStoreNames.map(name => this.getSharedStoreProviders(name));
    const injector = Injector.create({
      parent: this.injector,
      providers: [localStoreProviders, this.buildSharedStoreProviders(sharedStoreProviders)],
    });
    const localStore = injector.get<TLocalStore>(localProvider.useClass);

    /** initialize local store state */
    localStore.initializeState();

    /** loop through shared/common store providers & initialize state */
    for (const [, injectionToken] of sharedStoreProviders) {
      injector.get<TLocalStore>(injectionToken).initializeState();
    }

    return localStore;
  }

  private getLocalStoreProviders(storeName: StoreName): LocalStoreProviders {
    const providersMap = new Map<StoreName, Provider[]>([
      // ['profile', provideProfileStore()],
      ['consultant', provideConsultantStore()],
    ]);

    return providersMap.get(storeName) as LocalStoreProviders;
  }

  private getSharedStoreProviders(storeName: SharedStoreName): [LocalStoreProviders, InjectionToken<unknown>] {
    const providersMap = new Map<SharedStoreName, [Provider[], InjectionToken<unknown>]>([
      /** shared/common store examples: modal, metrics, any-duplicated-state */
      ['list', [provideListStore(), LIST_STORE_TOKEN]],
    ]);

    return providersMap.get(storeName) as [LocalStoreProviders, InjectionToken<unknown>];
  }

  private buildSharedStoreProviders(providers: Array<[LocalStoreProviders, InjectionToken<unknown>]>): Provider[] {
    return providers.reduce<Provider[]>((accuProviders, currentProviders) => {
      const [localStoreProviders, injectionToken] = currentProviders;
      const [, factoryProvider] = localStoreProviders;

      accuProviders.push(...localStoreProviders, {
        provide: injectionToken,
        useFactory: factoryProvider.useFactory,
      });
      return accuProviders;
    }, []);
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
