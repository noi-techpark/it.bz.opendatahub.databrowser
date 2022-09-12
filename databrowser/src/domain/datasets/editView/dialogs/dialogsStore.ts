import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  discardChangesDialogVisible: boolean;
  leaveSectionDialogVisible: boolean;
}

const initialState: State = {
  discardChangesDialogVisible: false,
  leaveSectionDialogVisible: false,
};

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
