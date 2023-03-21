import { acceptHMRUpdate, defineStore } from 'pinia';

const initialState = { visible: false };

export const useToolboxStore = defineStore('toolboxStore', {
  state: () => initialState,
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToolboxStore, import.meta.hot));
}
