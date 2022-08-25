import { acceptHMRUpdate, defineStore } from 'pinia';
import { EditImageGalleryNavigable, initialState } from './initialState';

export const useEditImageGalleryNavigation = defineStore(
  'editImageGalleryNavigation',
  {
    state: () => initialState,
    actions: {
      navigateTo(next: EditImageGalleryNavigable) {
        this.previous = this.current;
        this.current = next;
      },
      navigateToTable() {
        this.navigateTo('table');
      },
      navigateToTab(index?: number) {
        this.navigateTo('tab');
        this.tabIndex = index ?? 0;
      },
      navigateToUpload() {
        this.navigateTo('upload');
      },
      navigateToPrevious() {
        const tmp = this.previous;
        this.current = this.previous;
        this.previous = tmp;
      },
    },
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useEditImageGalleryNavigation, import.meta.hot)
  );
}
