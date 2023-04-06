import { Injectable, Injector, Provider, ClassProvider } from '@angular/core';
import {
  LocalModel,
  LocalState,
  LocalStore,
  StoreName,
  provideConsultantStore,
  provideProfileStore,
} from '@app/store/local';

@Injectable()
export class LocalStoreFactory {
  constructor(private injector: Injector) {}

  createInstance<
    TLocalStore extends LocalStore<TState, TModel>,
    TState extends LocalState<LocalModel> = LocalState<LocalModel>,
    TModel extends LocalModel = LocalModel
  >(storeName: StoreName): TLocalStore {
    /**
     * https://github.com/ngrx/platform/blob/master/modules/component-store/src/lifecycle_hooks.ts
     * the localStoreProviders array contains:
     * [0] - provider for the local store
     * [1] - provider for CS_WITH_HOOKS to call the useFactory and execute the hooks.
     */
    const localStoreProviders = this.getStoreProviders(storeName);
    const [provider] = localStoreProviders;

    const injector = Injector.create({
      parent: this.injector,
      /** There should ONLY be 1 local store that will be added to DI + the root (parent injector). */
      providers: [localStoreProviders],
    });

    const store = injector.get((provider as ClassProvider).useClass);

    store.initializeState();

    return store;
  }

  private getStoreProviders(storeName: StoreName): Provider[] {
    const storeConstructorMap = new Map<StoreName, Provider[]>([
      ['profile', provideProfileStore()],
      ['consultant', provideConsultantStore()],
    ]);
    return storeConstructorMap.get(storeName)!;
  }
}

export const provideLocalStoreFactory = (): Provider => LocalStoreFactory;
