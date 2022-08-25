<template>
  <section>
    <EditImageGalleryTableOverview
      v-if="navigation.current === 'table'"
      :images="galleryEntries"
      @delete-images="deleteImages"
      @duplicate-image="duplicateImage"
      @update-images="updateImages"
    />
    <EditImageGalleryTabOverview
      v-else-if="navigation.current === 'tab'"
      :images="galleryEntries"
      @delete-all-images="deleteAllImages"
      @delete-images="deleteImages"
      @duplicate-image="duplicateImage"
      @update-images="updateImages"
    />
    <EditImageGalleryUploadImage
      v-else-if="navigation.current === 'upload'"
      @upload-success="uploadSuccess"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, reactive, ref, watch } from 'vue';
import { usePropertyMapping } from '../../../../api';
import EditImageGalleryTableOverview from './table/EditImageGalleryTableOverview.vue';
import { ImageGalleryEntry } from './types';
import EditImageGalleryTabOverview from './tab/EditImageGalleryTabOverview.vue';
import EditImageGalleryUploadImage from './upload/EditImageGalleryUploadImage.vue';
import * as R from 'ramda';
import { useEditImageGalleryNavigation } from './store/useEditImageGalleryNavigation';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface ImageGalleryCellProps {
  images?: Record<string, unknown>[];
  alt?: string;
  src?: string;
  name?: string;
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  copyright?: string;
  license?: string;
  listPosition?: string;
  source?: string;
}

const emit = defineEmits(['update']);

const props = defineProps<ImageGalleryCellProps>();

const navigation = useEditImageGalleryNavigation();

// Use internal copy of images for quicker operations (e.g. sorting)
// The internal copy is also updated in case the images prop updates
const imagesInternal = ref(props.images ?? []);
watch(
  () => props.images,
  (imagesValue) => (imagesInternal.value = imagesValue ?? []),
  { immediate: true }
);

// Compute attribute mappings
const attributeMappings = computed(() => {
  const mappingsWithoutImages = R.dissocPath<
    Omit<ImageGalleryCellProps, 'images'>
  >(['images'], props);
  const unwrapped = reactive(mappingsWithoutImages ?? {});
  return R.reject((v) => R.isNil(v))(unwrapped);
});

const { mapWithIndex, mapWithReverseIndex } = usePropertyMapping();

// Map images from internal props-copy to gallery entries
const galleryEntries = computed(
  () =>
    imagesInternal.value.map(
      (img) => mapWithIndex(img, attributeMappings.value) as ImageGalleryEntry
    ) ?? []
);

const deleteImages = (indexes: number[]) => {
  const indexSet = new Set(indexes);
  const remainingImages = imagesInternal.value.filter(
    (img, index) => !indexSet.has(index)
  );
  imagesInternal.value = remainingImages;
  emit('update', { prop: 'images', value: remainingImages });
};

const deleteAllImages = () => {
  imagesInternal.value = [];
  emit('update', { prop: 'images', value: imagesInternal.value });
  navigation.navigateToTable();
};

const duplicateImage = (index: number) => {
  const duplicatedEntry = { ...imagesInternal.value[index] };

  imagesInternal.value = [
    ...imagesInternal.value.slice(0, index + 1),
    duplicatedEntry,
    ...imagesInternal.value.slice(index + 1),
  ];

  emit('update', { prop: 'images', value: imagesInternal.value });
};

const updateImages = (imageGalleryEntries: ImageGalleryEntry[]) => {
  const updatedImages = imageGalleryEntries.map((imageGalleryEntry, index) =>
    mapWithReverseIndex(
      imageGalleryEntry as Record<string, string>,
      attributeMappings.value,
      imagesInternal.value[index]
    )
  );
  imagesInternal.value = updatedImages;
  emit('update', { prop: 'images', value: updatedImages });
};

const uploadSuccess = (urls: string[]) => {
  const newImages = urls.map<ImageGalleryEntry>((url) => ({ src: url }));
  updateImages([...galleryEntries.value, ...newImages]);
  navigation.navigateToTab(imagesInternal.value.length - 1);
};
</script>
