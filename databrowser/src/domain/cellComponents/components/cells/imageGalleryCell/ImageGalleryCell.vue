<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div v-for="(image, index) in resolvedImages" :key="index" class="w-56">
        <ImageCell :src="image.src" :alt="image.alt" />
        <div class="text-sm text-gray-500">Image</div>
        <StringCell :text="image.name" class="break-all" />
        <div class="text-sm text-gray-500">Resolution</div>
        <StringTemplateCell
          :p1="image.width"
          :p2="image.height"
          :string-template="'{p1}x{p2} px'"
        />
        <div class="text-sm text-gray-500">Title</div>
        <StringCell :text="image.title" />
        <div class="text-sm text-gray-500">Description</div>
        <StringCell :text="image.description" />
        <div class="text-sm text-gray-500">License</div>
        <StringCell :text="image.license" />
        <div class="text-sm text-gray-500">Position</div>
        <StringCell :text="image.listPosition" />
        <div class="text-sm text-gray-500">Active</div>
        <StringCell :text="image.active" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useFieldExtraction } from '../../../../api/configUtils';
import ImageCell from '../imageCell/ImageCell.vue';
import StringCell from '../stringCell/StringCell.vue';
import StringTemplateCell from '../stringTemplateCell/StringTemplateCell.vue';

/**
 * All fields except "images" are expected to be paths that can be resolved by
 * lodash "get" function (see https://docs-lodash.com/v4/get/) using the "images"
 * as base object.
 */
export interface ImageGalleryCellProps {
  images?: [];
  alt?: string;
  src?: string;
  name?: string;
  width?: string;
  height?: string;
  title?: string;
  description?: string;
  license?: string;
  listPosition?: string;
  active?: string;
}

export type ImageGalleryEntry = Omit<ImageGalleryCellProps, 'images'>;

const props = defineProps<ImageGalleryCellProps>();

const { images, ...fieldsAsRef } = toRefs(props);

const fields = Object.entries(fieldsAsRef).reduce(
  (previous: ImageGalleryEntry, [key, value]: [string, Ref<string>]) =>
    value?.value == null ? previous : { ...previous, [key]: value.value },
  {}
);

const { getValue } = useFieldExtraction();

const resolvedImages: ComputedRef<ImageGalleryCellProps[]> = computed(() => {
  return (
    images?.value?.map(
      (image) => getValue(image, fields) as ImageGalleryCellProps
    ) ?? []
  );
});
</script>
