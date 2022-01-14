<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <div class="text-sm text-gray-500">GPS Type</div>
        <StringCell :text="gpsEntry.type" class="break-all" />
        <div class="text-sm text-gray-500">Latitude</div>
        <StringCell :text="gpsEntry.latitude" />
        <div class="text-sm text-gray-500">Longitude</div>
        <StringCell :text="gpsEntry.longitude" />
        <div class="text-sm text-gray-500">Altitude</div>
        <StringCell :text="gpsEntry.altitude" />
        <div class="text-sm text-gray-500">Altitude Unit</div>
        <StringCell :text="gpsEntry.altitudeUnit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useUrlQueryRouter } from '../../../../lib/urlQuery/urlQueryRouter';
import { extractField } from '../../../api/configUtils';
import { defaultQueryParameters } from '../../../datasets/tableView/defaultValues';
import StringCell from '../stringCell/StringCell.vue';

/**
 * All fields except "gpsEntries" are expected to be paths that can be resolved by
 * lodash "get" function (see https://docs-lodash.com/v4/get/) using the "gpsEntries"
 * as base object.
 */
export interface GpsGalleryCellProps {
  gpsEntries?: [];
  type?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  altitudeUnit?: string;
}

export type GpsGalleryEntry = Omit<GpsGalleryCellProps, 'gpsEntries'>;

const props = defineProps<GpsGalleryCellProps>();

const { gpsEntries, ...fieldsAsRef } = toRefs(props);

const fields = Object.entries(fieldsAsRef).reduce(
  (previous: GpsGalleryEntry, [key, value]: [string, Ref<string>]) =>
    value?.value == null ? previous : { ...previous, [key]: value.value },
  {}
);

const queryRouter = useUrlQueryRouter({ defaultQueryParameters });
const { queryParametersWithDefaults } = toRefs(queryRouter);

const resolvedGpsEntries: ComputedRef<GpsGalleryCellProps[]> = computed(() => {
  return (
    gpsEntries?.value?.map(
      (gpsEntry) =>
        extractField(
          gpsEntry,
          fields,
          queryParametersWithDefaults.value
        ) as GpsGalleryCellProps
    ) ?? []
  );
});
</script>
