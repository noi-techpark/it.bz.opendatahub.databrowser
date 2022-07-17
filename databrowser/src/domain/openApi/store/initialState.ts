import { DocumentState, SupportedDomains } from '../types';

export const initialState: Record<SupportedDomains, DocumentState> = {
  tourism: {
    loading: false,
    loaded: false,
    error: null,
  },
  mobility: {
    loading: false,
    loaded: false,
    error: null,
  },
};
