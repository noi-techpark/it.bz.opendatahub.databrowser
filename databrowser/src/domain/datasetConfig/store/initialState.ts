import { DatasetConfig, DatasetRoute, ViewKey } from '../types';
import { SourceType } from '../source/types';

export interface State {
  config?: DatasetConfig;
  source?: SourceType;
  viewKey?: ViewKey;
  datasetRoute?: DatasetRoute;
  resolution: {
    state: 'init' | 'empty' | 'pending' | 'success' | 'error';
    error?: string;
  };
}

export const initialState: State = {
  config: undefined,
  source: undefined,
  viewKey: undefined,
  datasetRoute: undefined,
  resolution: {
    state: 'init',
  },
};
