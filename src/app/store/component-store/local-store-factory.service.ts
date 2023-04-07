import { Injectable, Injector, Provider } from '@angular/core';
import {
  LocalState,
  LocalStore,
  LocalStoreProviders,
  StoreName,
  provideConsultantStore,
  provideProfileStore,
} from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<
    TLocalStore extends LocalStore<TState, TModel>,
    TState extends LocalState<TModel>,
    TModel extends {
      id: string;
    }
  >(storeName: StoreName): TLocalStore {
    const storeProviders = this.getStoreProviders(storeName);
    /**
     * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
     * the localStoreProviders array contains:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS to call the useFactory and execute the hooks.
     */
    const [provider] = storeProviders;
    const injector = Injector.create({
      parent: this.injector,
      /** There should ONLY be 1 local store that will be added to DI + the root (parent injector). */
      providers: [storeProviders],
    });
    const store = injector.get<TLocalStore>(provider.useClass);

    store.initializeState();

    return store;
  }

  private getStoreProviders(storeName: StoreName): LocalStoreProviders {
    const providersMap = new Map<StoreName, Provider[]>([
      ['profile', provideProfileStore()],
      ['consultant', provideConsultantStore()],
    ]);

    return providersMap.get(storeName) as LocalStoreProviders;
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
