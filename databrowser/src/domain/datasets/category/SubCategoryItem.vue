<template>
  <div class="relative pb-2" :class="{ 'has-error': hasError }">
    <div
      v-if="required"
      class="dot absolute mr-1 mt-3.5 -ml-2 inline-block h-1 w-1 rounded-full bg-red-600"
    ></div>
    <div
      v-if="hasTitleOrTooltip"
      class="relative flex items-center justify-between py-1"
    >
      <div
        class="font-semibold"
        :class="[{ 'text-hint-error': hasEmptyValue }]"
      >
        {{ title }}
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
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import IconInfo from '../../../components/svg/IconInfo.vue';

const props = defineProps<{
  title?: string;
  tooltip?: string;
  required?: boolean;
  errors?: string[];
  hasEmptyValue?: boolean;
}>();

const hasTitleOrTooltip = computed(
  () => (props.title != null && props.title.length > 0) || props.tooltip != null
);

const hasError = computed(
  () => props.errors != null && props.errors.length > 0
);
</script>
