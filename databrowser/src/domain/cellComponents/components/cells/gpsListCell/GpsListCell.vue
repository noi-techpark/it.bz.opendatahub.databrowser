<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        v-for="(gpsEntry, index) in resolvedGpsEntries"
        :key="index"
        class="w-56"
      >
        <SubCategoryItem title="GPS Type">
          <StringCell :text="gpsEntry.type" class="break-all" />
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
        <SubCategoryItem title="Altitude Unit">
          <StringCell :text="gpsEntry.altitudeUnit" />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, defineProps, Ref, toRefs } from 'vue';
import StringCell from '../stringCell/StringCell.vue';
import { usePropertyMapping } from '../../../../api';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';

/**
 * All fields except "gpsEntries" are expected to be json paths that can be resolved by
 * the ramda "view" function (see https://ramdajs.com/docs/#view) using the "images"
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

const { mapWithIndex } = usePropertyMapping();

const resolvedGpsEntries: ComputedRef<GpsListCellProps[]> = computed(() => {
  return (
    gpsEntries?.value?.map((gpsEntry) => mapWithIndex(gpsEntry, fields)) ?? []
  );
});
</script>
