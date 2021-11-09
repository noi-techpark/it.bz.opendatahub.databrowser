import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootState } from '~/store';

export interface ErrorEntry {
  id: string;
  error?: Error;
  timestamp?: number;
}

export interface ErrorState {
  errors: ErrorEntry[];
}

export const state: () => ErrorState = () => ({
  errors: [],
});

export const getters: GetterTree<ErrorState, any> = {
  getError: (state) => (id: string) =>
    state.errors.find((error) => (error.id = id)),
  getAllErrors: (state) => state.errors,
};

export const mutations: MutationTree<ErrorState> = {
  addError(state, { id, error }: Omit<ErrorEntry, 'timestamp'>) {
    state.errors = [...state.errors, { id, error, timestamp: Date.now() }];
  },
  removeError(state, { id }: { id: string }) {
    state.errors = state.errors.filter((error) => error.id !== id);
  },
  removeAllErrors(state) {
    state.errors = [];
  },
};

export const actions: ActionTree<ErrorState, RootState> = {
  addError(
    { commit },
    {
      id,
      error,
      cancelAfterMillis,
    }: Omit<ErrorEntry, 'timestamp'> & { cancelAfterMillis?: number }
  ) {
    commit('addError', { id, error });
    if (cancelAfterMillis != null && cancelAfterMillis > 0) {
      setTimeout(() => commit('removeError', { id }), cancelAfterMillis);
    }
  },
  removeError({ commit }, { id }: { id: string }) {
    commit('removeError', { id });
  },
  removeAllErrors({ commit }) {
    commit('removeAllErrors');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
