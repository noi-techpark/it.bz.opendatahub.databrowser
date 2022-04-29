<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div v-for="(image, index) in resolvedImages" :key="index" class="w-56">
        <SubCategory
          ><ImageCell :src="image.src" :alt="image.alt"
        /></SubCategory>
        <SubCategory title="Image">
          <StringCell :text="image.name" class="break-all" />
        </SubCategory>
        <SubCategory title="Resolution">
          <StringTemplateCell
            :p1="image.width"
            :p2="image.height"
            :string-template="'{p1}x{p2} px'"
          />
        </SubCategory>
        <SubCategory title="Title">
          <StringCell :text="image.title" />
        </SubCategory>
        <SubCategory title="Description">
          <StringCell :text="image.description" />
        </SubCategory>
        <SubCategory title="License">
          <StringCell :text="image.license" />
        </SubCategory>
        <SubCategory title="Position">
          <StringCell :text="image.listPosition" />
        </SubCategory>
        <SubCategory title="Active">
          <StringCell :text="image.active" />
        </SubCategory>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useFieldExtraction } from '../../../../api/service/utils';
import ImageCell from '../imageCell/ImageCell.vue';
import StringCell from '../stringCell/StringCell.vue';
import StringTemplateCell from '../stringTemplateCell/StringTemplateCell.vue';
import SubCategory from '../../../../datasets/detailView/SubCategory.vue';

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
