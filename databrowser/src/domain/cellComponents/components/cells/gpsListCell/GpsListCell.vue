<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <SubCategory title="GPS Type">
          <StringCell :text="gpsEntry.type" class="break-all" />
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
        <SubCategory title="Altitude Unit">
          <StringCell :text="gpsEntry.altitudeUnit" />
        </SubCategory>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import { useFieldExtraction } from '../../../../viewConfig';
import StringCell from '../stringCell/StringCell.vue';
import SubCategory from '../../../../datasets/detailView/SubCategory.vue';

/**
 * All fields except "gpsEntries" are expected to be paths that can be resolved by
 * lodash "get" function (see https://docs-lodash.com/v4/get/) using the "gpsEntries"
 * as base object.
 */
export interface GpsListCellProps {
  gpsEntries?: [];
  type?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  altitudeUnit?: string;
}

export type GpsListEntry = Omit<GpsListCellProps, 'gpsEntries'>;

const props = defineProps<GpsListCellProps>();

const { gpsEntries, ...fieldsAsRef } = toRefs(props);

const fields = Object.entries(fieldsAsRef).reduce(
  (previous: GpsListEntry, [key, value]: [string, Ref<string>]) =>
    value?.value == null ? previous : { ...previous, [key]: value.value },
  {}
);

const { getValue } = useFieldExtraction();

const resolvedGpsEntries: ComputedRef<GpsListCellProps[]> = computed(() => {
  return (
    gpsEntries?.value?.map(
      (gpsEntry) => getValue(gpsEntry, fields) as GpsListCellProps
    ) ?? []
  );
});
</script>
