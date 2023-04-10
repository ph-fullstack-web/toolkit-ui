import { Provider, InjectionToken } from '@angular/core';

import {
  provideConsultantStore,
  CONSULTANT_STORE_TOKEN,
  LIST_STORE_TOKEN,
  provideListStore,
  LocalStoreName,
  SharedStoreName,
} from '@app/store/local';

export const localStoreProvidersMap = new Map<LocalStoreName, [Provider[], InjectionToken<unknown>]>([
  /**
   * add local stores here for mapping
   */
  ['consultant', [provideConsultantStore(), CONSULTANT_STORE_TOKEN]],
]);

export const sharedStoreProvidersMap = new Map<SharedStoreName, [Provider[], InjectionToken<unknown>]>([
  /**
   * add shared local stores here for mapping
   * shared/common store examples: modal, metrics, any-duplicated-state
   */
  ['list', [provideListStore(), LIST_STORE_TOKEN]],
]);
