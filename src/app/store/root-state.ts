import { fromAuth } from './auth';

export interface RootState {
  [fromAuth.name]: fromAuth.State;
  /** Add feature state slice here.. */
}
