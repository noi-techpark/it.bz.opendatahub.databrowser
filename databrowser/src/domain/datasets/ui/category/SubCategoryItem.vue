<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div
    class="relative pb-2"
    :class="{
      'has-error': hasError,
      'my-1 border border-deprecated p-2': hasDeprecationInfo,
    }"
  >
    <div
      v-if="hasTitleOrTooltip"
      class="relative flex items-center justify-between py-1"
    >
      <div
        class="font-semibold"
        :class="[{ 'text-hint-error': hasEmptyValue }]"
      >
        {{ title }}
        <span v-if="required">*</span>
      </div>
      <div
        v-if="tooltip != null"
        class="h-4 w-4 text-green-400"
        :title="tooltip"
      >
        <IconInfo />
      </div>
    </div>
    <span v-if="hasEmptyValue" class="text-hint-error">/</span>
    <slot v-else></slot>
    <ul v-if="hasError" class="mt-1 text-error">
      <li v-for="(err, index) in errors" :key="index">
        {{ err }}
      </li>
    </ul>

    <div v-if="hasDeprecationInfo" class="mt-2 flex flex-col gap-2">
      <div
        v-for="(item, i) in availableDeprecationInfo"
        :key="i"
        class="flex items-center justify-between gap-3 rounded bg-deprecated/10 px-2 py-3 text-sm text-deprecated"
      >
        <p v-if="availableDeprecationInfo.length > 1">
          {{ item.pathToDeprecation }}
        </p>
        <p v-else>This field is deprecated</p>
        <TagCustom type="purple" text="Deprecated" has-dot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconInfo from '../../../../components/svg/IconInfo.vue';
import TagCustom from '../../../../components/tag/TagCustom.vue';
import { DeprecationInfo } from '../../config/types';

const props = defineProps<{
  title?: string;
  tooltip?: string;
  required?: boolean;
  deprecationInfo?: DeprecationInfo[];
  errors?: string[];
  hasEmptyValue?: boolean;
}>();

const hasTitleOrTooltip = computed(
  () => (props.title != null && props.title.length > 0) || props.tooltip != null
);

const hasError = computed(
  () => props.errors != null && props.errors.length > 0
);

const hasDeprecationInfo = computed(
  () => props.deprecationInfo != null && props.deprecationInfo.length > 0
);

const availableDeprecationInfo = computed(() => {
  return props.deprecationInfo
    ? props.deprecationInfo.map((item) => item.deprecations).flat() || []
    : [];
});
</script>
