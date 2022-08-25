import { acceptHMRUpdate, defineStore } from 'pinia';
import { initialState } from './initialState';

export const useDialogsStore = defineStore('dialogsStore', {
  state: () => initialState,
  getters: {
    isAnyDialogOpen(state) {
      return (
        state.discardChangesDialogVisible || state.leaveSectionDialogVisible
      );
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogsStore, import.meta.hot));
}
