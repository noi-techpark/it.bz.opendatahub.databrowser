<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex w-full overflow-auto">
    <div class="flex gap-5">
      <div v-for="(image, index) in resolvedImages" :key="index" class="w-56">
        <SubCategoryItem>
          <ImageCell :src="image.src" :alt="image.alt" />
        </SubCategoryItem>
        <SubCategoryItem title="Image">
          <StringCell :text="image.name" class="break-all" />
        </SubCategoryItem>
        <SubCategoryItem title="Resolution">
          <StringTemplateCell
            :p1="image.width"
            :p2="image.height"
            :string-template="'{p1}x{p2} px'"
          />
        </SubCategoryItem>
        <SubCategoryItem title="Title">
          <StringCell :text="image.title" />
        </SubCategoryItem>
        <SubCategoryItem title="Description">
          <StringCell :text="image.description" />
        </SubCategoryItem>
        <SubCategoryItem title="License">
          <StringCell :text="image.license" />
        </SubCategoryItem>
        <SubCategoryItem title="Position">
          <StringCell :text="image.listPosition" />
        </SubCategoryItem>
        <SubCategoryItem title="Active">
          <StringCell :text="image.active" />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, toRefs } from 'vue';
import { buildTargetFromObjectMapping } from '../../../../api';
import ImageCell from '../imageCell/ImageCell.vue';
import StringCell from '../stringCell/StringCell.vue';
import StringTemplateCell from '../stringTemplateCell/StringTemplateCell.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';
import { ObjectMappings } from '../../../../datasetConfig/types';

/**
 * All fields except "images" are expected to be json paths that can be resolved by
 * the ramda "view" function (see https://ramdajs.com/docs/#view) using the "images"
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

const { images, ...listPropertyMappingsAsRef } = toRefs(props);

const resolvedImages: ComputedRef<ImageGalleryCellProps[]> = computed(() => {
  // Compute property mappings for image, e.g. where to find the "src" information
  // in the "image" objects.
  const objectMappings = Object.entries(
    listPropertyMappingsAsRef
  ).reduce<ObjectMappings>(
    (previous: ImageGalleryEntry, [key, value]) =>
      value?.value == null ? previous : { ...previous, [key]: value.value },
    {}
  );

  return (
    images?.value?.map((image) =>
      buildTargetFromObjectMapping(image, objectMappings)
    ) ?? []
  );
});
</script>
