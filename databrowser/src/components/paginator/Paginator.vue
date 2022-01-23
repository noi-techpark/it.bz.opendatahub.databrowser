<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="pagination != null" class="flex items-center">
    <button
      :disabled="result.previous?.isDisabled"
      class="next-previous-button"
      @click="paginateTo(result.previous?.indexNumber)"
    >
      <ArrowLeft />
    </button>

    <PillButtonGroup
      :data="result.pageNumbers"
      :initial-selected="result.currentPageNumber"
      class="inline-flex mx-2.5"
      @selected-change="paginateTo($event)"
    />

    <button
      :disabled="result.next?.isDisabled"
      class="next-previous-button"
      @click="paginateTo(result.next?.indexNumber)"
    >
      <ArrowRight />
    </button>
  </div>
</template>

<script setup lang="ts">
import { calculatePagination } from '@aboutbits/pagination';
import { defineEmits, defineProps } from '@vue/runtime-core';
import { Pagination } from '../../domain/api/client/types';
import ArrowRight from '../svg/ArrowRight.vue';
import ArrowLeft from '../svg/ArrowLeft.vue';
import { reactive, watch } from 'vue';
import { SetupResult } from './types';
import PillButtonGroup from '../pill/PillButtonGroup.vue';

const props = defineProps<{
  pagination?: Pagination;
}>();

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'paginateTo', item: number): void }>();

const paginateTo = (value: string | number | undefined) => {
  if (value != undefined) {
    const numberValue = typeof value === 'string' ? parseInt(value, 10) : value;
    emits('paginateTo', numberValue);
  }
};

const result = reactive<SetupResult>({
  currentPageNumber: '0',
  pageNumbers: [],
  previous: undefined,
  next: undefined,
});

watch(
  () => props.pagination,
  (pagination) => {
    const calculatedPagination = calculatePagination(
      pagination?.page ?? 1,
      pagination?.size ?? 0,
      pagination?.total ?? 0
    );

    result.pageNumbers =
      calculatedPagination?.pages.map((page) =>
        page.displayNumber?.toString()
      ) ?? [];

    result.currentPageNumber =
      calculatedPagination?.pages
        .find((page) => page.isCurrent)
        ?.indexNumber?.toString() ?? '1';

    result.previous = calculatedPagination?.previous;
    result.next = calculatedPagination?.next;
  },
  { immediate: true }
);
</script>

<style>
.next-previous-button {
  @apply flex justify-center items-center rounded-full border border-gray-500 hover:bg-gray-300 hover:text-green-500 h-9 w-9;
}

.next-previous-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-white;
}
</style>
