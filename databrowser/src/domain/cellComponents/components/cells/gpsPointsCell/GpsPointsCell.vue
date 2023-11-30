<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div v-if="isAnyPropertySet" class="flex w-full overflow-auto">
    <div class="flex gap-5">
      <div class="w-36">
        <SubCategoryItem v-if="type != null" title="GPS Type">
          <StringCell :text="type" class="break-all" />
        </SubCategoryItem>
        <SubCategoryItem v-if="latitude != null" title="Latitude">
          <StringCell :text="latitude" />
        </SubCategoryItem>
        <SubCategoryItem v-if="longitude != null" title="Longitude">
          <StringCell :text="longitude" />
        </SubCategoryItem>
        <SubCategoryItem v-if="altitude != null" title="Altitude">
          <StringCell :text="altitude" />
        </SubCategoryItem>
        <SubCategoryItem v-if="altitudeUnit != null" title="Altitude Unit">
          <StringCell :text="altitudeUnit" />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SubCategoryItem from '../../../../datasets/ui/category/SubCategoryItem.vue';
import StringCell from '../stringCell/StringCell.vue';

const props = defineProps<{
  type?: string;
  latitude?: string | number;
  longitude?: string | number;
  altitude?: string | number;
  altitudeUnit?: string;
}>();

const isAnyPropertySet = computed(
  () =>
    props.type != null ||
    props.latitude != null ||
    props.longitude != null ||
    props.altitude != null ||
    props.altitudeUnit != null
);
</script>
