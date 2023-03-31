import { fromAuth } from './features';

export interface RootState {
  [fromAuth.featureName]: fromAuth.State;
  /** Add feature state slice here.. */
}
