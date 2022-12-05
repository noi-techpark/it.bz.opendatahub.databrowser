<template>
  <div class="flex w-full overflow-auto">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <SubCategoryItem title="Name">
          <StringCell :text="gpsEntry.name" class="break-all" />
        </SubCategoryItem>
        <SubCategoryItem title="Image">
          <ImageCell :src="gpsEntry.image" :alt="gpsEntry.name" />
        </SubCategoryItem>
        <SubCategoryItem title="Image-URL (Web-Url)">
          <StringCell :text="gpsEntry.imageUrl" class="break-all" />
        </SubCategoryItem>
        <SubCategoryItem title="Latitude">
          <StringCell :text="gpsEntry.latitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Longitude">
          <StringCell :text="gpsEntry.longitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Altitude">
          <StringCell :text="gpsEntry.altitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Position">
          <StringCell :text="gpsEntry.listPosition" />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { usePropertyMapping } from '../../../../api';
import StringCell from '../stringCell/StringCell.vue';
import ImageCell from '../imageCell/ImageCell.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';

/**
 * All fields except "webcams" are expected to be json paths that can be resolved by
 * the ramda "view" function (see https://ramdajs.com/docs/#view) using the "images"
 * as base object.
 */
export interface WebcamGalleryCellProps {
  webcams?: [];
  name?: string;
  image?: string;
  imageUrl?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  listPosition?: string;
}

export type WebcamGalleryEntry = Omit<WebcamGalleryCellProps, 'webcams'>;

const props = defineProps<WebcamGalleryCellProps>();

const { webcams, ...fieldsAsRef } = toRefs(props);

const fields = Object.entries(fieldsAsRef).reduce<Record<string, string>>(
  (previous: WebcamGalleryEntry, [key, value]: [string, Ref<string>]) =>
    value?.value == null ? previous : { ...previous, [key]: value.value },
  {}
);

const { mapWithIndex } = usePropertyMapping();

const resolvedGpsEntries: ComputedRef<WebcamGalleryCellProps[]> = computed(
  () => webcams?.value?.map((webcam) => mapWithIndex(webcam, fields)) ?? []
);
</script>
