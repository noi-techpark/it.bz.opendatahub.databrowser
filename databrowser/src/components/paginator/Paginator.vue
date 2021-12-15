<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="pagination != null" class="flex items-center">
    <button
      :disabled="previous?.isDisabled"
      class="next-previous-button"
      @click="$emit('paginateTo', previous?.indexNumber)"
    >
      <ArrowLeft />
    </button>

    <PillGroup
      :data="pageNumbers"
      :initial-selected="currentPageNumber"
      class="inline-flex mx-2.5"
      @selected-change="$emit('paginateTo', $event)"
    />

    <button
      :disabled="next?.isDisabled"
      class="next-previous-button"
      @click="$emit('paginateTo', next?.indexNumber)"
    >
      <ArrowRight />
    </button>
  </div>
</template>

<script lang="ts">
import { calculatePagination } from '@aboutbits/pagination';
import { defineComponent, PropType } from '@vue/runtime-core';
import { Pagination } from '../../domain/api/types';
import ArrowRight from '../svg/ArrowRight.vue';
import ArrowLeft from '../svg/ArrowLeft.vue';
import { reactive, watch } from 'vue';
import { SetupResult } from './types';
import PillGroup from '../pill/PillGroup.vue';

export default defineComponent({
  components: { ArrowRight, ArrowLeft, PillGroup },
  props: {
    pagination: {
      default: () => null,
      type: [Object] as PropType<Pagination | null>,
    },
  },
  emits: ['paginateTo'],
  setup(props) {
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

    return result;
  },
});
</script>

<style>
.next-previous-button {
  @apply flex justify-center items-center rounded-full border border-gray-500 hover:bg-gray-300 hover:text-green-500 h-9 w-9;
}
.next-previous-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-white;
}
</style>
