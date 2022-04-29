<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <SubCategory title="Name">
          <StringCell :text="gpsEntry.name" class="break-all" />
        </SubCategory>
        <SubCategory title="Image">
          <ImageCell :src="gpsEntry.image" :alt="gpsEntry.name" />
        </SubCategory>
        <SubCategory title="Image-URL (Web-Url)">
          <StringCell :text="gpsEntry.imageUrl" class="break-all" />
        </SubCategory>
        <SubCategory title="Latitude">
          <StringCell :text="gpsEntry.latitude" />
        </SubCategory>
        <SubCategory title="Longitude">
          <StringCell :text="gpsEntry.longitude" />
        </SubCategory>
        <SubCategory title="Altitude">
          <StringCell :text="gpsEntry.altitude" />
        </SubCategory>
        <SubCategory title="Position">
          <StringCell :text="gpsEntry.listPosition" />
        </SubCategory>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useFieldExtraction } from '../../../../viewConfig';
import StringCell from '../stringCell/StringCell.vue';
import ImageCell from '../imageCell/ImageCell.vue';
import SubCategory from '../../../../datasets/detailView/SubCategory.vue';

/**
 * All fields except "webcams" are expected to be paths that can be resolved by
 * lodash "get" function (see https://docs-lodash.com/v4/get/) using the "webcams"
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

const fields = Object.entries(fieldsAsRef).reduce(
  (previous: WebcamGalleryEntry, [key, value]: [string, Ref<string>]) =>
    value?.value == null ? previous : { ...previous, [key]: value.value },
  {}
);

const { getValue } = useFieldExtraction();

const resolvedGpsEntries: ComputedRef<WebcamGalleryCellProps[]> = computed(
  () =>
    webcams?.value?.map(
      (webcam) => getValue(webcam, fields) as WebcamGalleryCellProps
    ) ?? []
);
</script>
