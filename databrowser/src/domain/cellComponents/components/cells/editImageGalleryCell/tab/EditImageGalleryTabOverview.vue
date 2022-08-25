<template>
  <div>
    <EditImageGalleryTabHeader
      :images="imagesInternal"
      :current-index="navigation.tabIndex"
      @change-current-index="navigation.tabIndex = $event"
      @delete-all-images="emit('deleteAllImages')"
    />
    <EditImageGalleryTabBody
      v-if="images[navigation.tabIndex] != null"
      class="mt-5"
      :image="images[navigation.tabIndex]"
      @delete-image="emit('deleteImages', [navigation.tabIndex])"
      @duplicate-image="emit('duplicateImage', navigation.tabIndex)"
      @update-image="updateImage($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, watch } from 'vue';
import EditImageGalleryTabHeader from './EditImageGalleryTabHeader.vue';
import EditImageGalleryTabBody from './EditImageGalleryTabBody.vue';
import { useEditImageGalleryNavigation } from '../store/useEditImageGalleryNavigation';

// Need to define interface in component because of Vue 3.2 bug (https://github.com/vuejs/core/issues/4294)
// Should be fixed in Vue 3.3
interface ImageGalleryEntry {
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

const emit = defineEmits([
  'deleteAllImages',
  'deleteImages',
  'duplicateImage',
  'pushImage',
  'updateImages',
]);

const props = defineProps<{
  images: ImageGalleryEntry[];
}>();

const navigation = useEditImageGalleryNavigation();

const imagesInternal = computed({
  get: () => props.images,
  set: (value) => emit('updateImages', value),
});

watch(
  () => props.images,
  (images) => {
    // Ensure that navigation.tabIndex is always in bounds
    // (may not be the case e.g. when last image in list is deleted)
    if (navigation.tabIndex >= images.length) {
      navigation.tabIndex = images.length - 1;
    }
  }
);

const updateImage = (image: ImageGalleryEntry) => {
  const images = imagesInternal.value.slice();
  images[navigation.tabIndex] = image;
  emit('updateImages', images);
};
</script>
