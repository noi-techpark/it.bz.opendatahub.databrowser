import { acceptHMRUpdate, defineStore } from 'pinia';

interface State {
  dialogVisible: boolean;
}

export const initialState: State = {
  dialogVisible: false,
};

export const useDeleteImageDialogStore = defineStore('deleteImageDialogStore', {
  state: () => initialState,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDeleteImageDialogStore, import.meta.hot)
  );
}
