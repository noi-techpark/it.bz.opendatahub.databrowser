import { acceptHMRUpdate, defineStore } from 'pinia';
import * as R from 'ramda';
import { markRaw } from 'vue';
import { EditData, initialState } from './initialState';

export const useEditStore = defineStore('editStore', {
  state: () => initialState,
  getters: {
    initialAsJson(state) {
      return JSON.stringify(state.initial, null, 2);
    },
    currentAsJson(state) {
      return JSON.stringify(state.current, null, 2);
    },
    isEqual(state) {
      return R.equals(state.initial, state.current);
    },
  },
  actions: {
    setInitial(initial: EditData) {
      this.initial = markRaw(initial);
    },
    setCurrent(next: EditData) {
      this.current = markRaw(next);
    },
    updateCurrent(prop: string, value: unknown) {
      const path = prop.split('.');
      const current = R.assocPath(path, value, this.current);
      this.setCurrent(markRaw(current));
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEditStore, import.meta.hot));
}
