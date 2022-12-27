import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  dialogVisible: boolean;
}

export const initialState: State = {
  dialogVisible: false,
};

export const useDeleteDialogStore = defineStore('deleteDialogStore', {
  state: () => initialState,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDeleteDialogStore, import.meta.hot)
  );
}
