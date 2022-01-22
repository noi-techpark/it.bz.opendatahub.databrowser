<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <div class="text-sm text-gray-500">Name</div>
        <StringCell :text="gpsEntry.name" class="break-all" />
        <div class="text-sm text-gray-500">Image</div>
        <ImageCell :src="gpsEntry.image" :alt="gpsEntry.name" />
        <div class="text-sm text-gray-500">Image-URL (Web-Url)</div>
        <StringCell :text="gpsEntry.imageUrl" class="break-all" />
        <div class="text-sm text-gray-500">Latitude</div>
        <StringCell :text="gpsEntry.latitude" />
        <div class="text-sm text-gray-500">Longitude</div>
        <StringCell :text="gpsEntry.longitude" />
        <div class="text-sm text-gray-500">Altitude</div>
        <StringCell :text="gpsEntry.altitude" />
        <div class="text-sm text-gray-500">Position</div>
        <StringCell :text="gpsEntry.listPosition" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useFieldExtraction } from '../../../../api/configUtils';
import StringCell from '../stringCell/StringCell.vue';
import ImageCell from '../imageCell/ImageCell.vue';

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
