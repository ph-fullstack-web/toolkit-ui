import { Injectable, InjectionToken, Injector, Provider } from '@angular/core';

import {
  LocalStore,
  LocalStoreName,
  LocalStoreProviders,
  MixedProviders,
  SharedStoreName,
  StoreName,
  localStoreProvidersMap,
  sharedStoreProvidersMap,
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
     * the localStoreProviders array contains:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS token to call the useFactory and execute the hooks.
     */
    const localStoreProviders = this.getStoreProviders(localStoreName);
    const [, tokenProvider] = localStoreProviders;
    const sharedStoreNames = options?.sharedStores ?? [];
    /** map & get ALL shared/common stores that can be injected into local stores. */
    const sharedStoreProviders = sharedStoreNames.map(name => this.getStoreProviders(name));

    const localInjector = Injector.create({
      parent: this.injector,
      providers: [localStoreProviders, ...sharedStoreProviders],
    });
    const localStore = localInjector.get<TLocalStore>(tokenProvider.provide);

    /** initialize local store state */
    localStore.initializeState();

    /** loop through shared/common store providers & initialize state */
    for (const [, tokenProvider] of sharedStoreProviders) {
      localInjector.get<TLocalStore>(tokenProvider.provide).initializeState();
    }

    return localStore;
  }
  private getStoreProviders(storeName: StoreName): LocalStoreProviders {
    const storeProvidersMap = new Map<StoreName, [Provider[], InjectionToken<unknown>]>([
      ...localStoreProvidersMap,
      ...sharedStoreProvidersMap,
    ]);
    const mixedProviders = storeProvidersMap.get(storeName) as MixedProviders;

    return this.buildStoreProviders(mixedProviders);
  }

  private buildStoreProviders(providers: MixedProviders): LocalStoreProviders {
    const [localStoreProviders, injectionToken] = providers;
    const [classProvider, factoryProvider] = localStoreProviders;

    return [classProvider, { provide: injectionToken, useFactory: factoryProvider.useFactory }];
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
