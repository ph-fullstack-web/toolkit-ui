import { InjectionToken } from '@angular/core';
import { IConsultantStore } from './consultant-store.contract';

export const CONSULTANT_STORE_TOKEN = new InjectionToken<IConsultantStore>('consultant store');
