<template>
  <div class="flex overflow-auto w-full">
    <div class="flex gap-5">
      <div
        class="w-56"
      >
        <SubCategoryItem title="GPS Type">
          <StringCell :text="type" class="break-all" />
        </SubCategoryItem>
        <SubCategoryItem title="Latitude">
          <StringCell :text="latitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Longitude">
          <StringCell :text="longitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Altitude">
          <StringCell :text="altitude" />
        </SubCategoryItem>
        <SubCategoryItem title="Altitude Unit">
          <StringCell :text="altitudeUnit" />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import StringCell from '../stringCell/StringCell.vue';
import SubCategoryItem from '../../../../datasets/category/SubCategoryItem.vue';

/**
 * All fields except "gpsEntries" are expected to be json paths that can be resolved by
 * the ramda "view" function (see https://ramdajs.com/docs/#view) using the "images"
 * as base object.
 */

 withDefaults(
  defineProps<{
  type?: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  altitudeUnit?: string;
  }>(),
  {
    type: undefined,
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
    altitudeUnit: undefined
  }
);
</script>
