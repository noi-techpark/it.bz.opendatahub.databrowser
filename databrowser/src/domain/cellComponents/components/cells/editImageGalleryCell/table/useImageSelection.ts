import { Ref, ref, watch } from 'vue';
import { ImageGalleryEntry } from '../types';

export const useImageSelection = (images: Ref<ImageGalleryEntry[]>) => {
  const allImagesSelected = ref(false);
  const anyImageSelected = ref(false);

  const imagesSelected = ref<boolean[]>([]);

  watch(
    () => images.value,
    (imagesValue) => {
      imagesSelected.value = [...Array(imagesValue.length)].map(() => false);
      allImagesSelected.value = false;
      anyImageSelected.value = false;
    },
    { immediate: true }
  );

  const toggleAllImagesSelected = (selected: boolean) => {
    imagesSelected.value = [...Array(images.value.length)].map(() => selected);
    allImagesSelected.value = selected;
    anyImageSelected.value = selected;
  };

  const toggleSingleImageSelection = (index: number) => {
    imagesSelected.value[index] = !imagesSelected.value[index];

    if (allImagesSelected.value === true) {
      if (imagesSelected.value.some((selected) => selected === false)) {
        allImagesSelected.value = false;
      }
    } else {
      if (
        imagesSelected.value.filter((selected) => selected === true).length ===
        imagesSelected.value.length
      ) {
        allImagesSelected.value = true;
      }
    }

    anyImageSelected.value = imagesSelected.value.some(
      (selected) => selected === true
    );
  };

  return {
    allImagesSelected,
    anyImageSelected,
    imagesSelected,
    toggleAllImagesSelected,
    toggleSingleImageSelection,
  };
};
