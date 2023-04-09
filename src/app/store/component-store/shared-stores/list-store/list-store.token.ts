import { InjectionToken } from '@angular/core';

import { IListStore } from '@app/store/local';

export const LIST_STORE_TOKEN = new InjectionToken<IListStore<{ id: string }>>('list store');
