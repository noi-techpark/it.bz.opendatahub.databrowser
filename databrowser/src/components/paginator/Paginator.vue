<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div v-if="pagination != null">
    <div v-if="paginationData" class="flex">
      <button
        :disabled="paginationData.previous.isDisabled"
        class="next-previous-button"
        @click="$emit('paginateTo', paginationData?.previous.indexNumber)"
      >
        <ArrowLeft />
      </button>
      <div class="flex mx-2.5">
        <div
          v-for="(item, index) in paginationData.pages"
          :key="item.indexNumber"
          :class="{
            'text-green-500 bg-opacity-10 bg-green-500 border-green-500':
              item.isCurrent,
            'hover:bg-gray-300': !item.isCurrent,
            'rounded-l-full border-l': index == 0,
            'rounded-r-full border-r': index == paginationData.pages.length - 1,
          }"
          class="
            overflow-hidden
            last:pr-2
            first:pl-2
            border-t border-b border-gray-500
          "
        >
          <button
            :class="{
              'border-green-500': item.isCurrent,
              'border-l': index != 0,
              'border-r': index != paginationData.pages.length - 1,
            }"
            class="border-transparent"
            type="button"
            @click="$emit('paginateTo', item.indexNumber)"
          >
            <span class="block py-1 px-2 font-semibold">{{
              item.displayNumber
            }}</span>
          </button>
        </div>
      </div>
      <button
        :disabled="paginationData.next.isDisabled"
        class="next-previous-button"
        @click="$emit('paginateTo', paginationData?.next.indexNumber)"
      >
        <ArrowRight />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { calculatePagination } from '@aboutbits/pagination';
import { defineComponent, PropType } from '@vue/runtime-core';
import { Pagination } from '../../domain/api/types';
import ArrowRight from '../svg/ArrowRight.vue';
import ArrowLeft from '../svg/ArrowLeft.vue';

export default defineComponent({
  components: { ArrowRight, ArrowLeft },
  props: {
    pagination: {
      required: false,
      default: () => null,
      type: [Object] as PropType<Pagination | null>,
    },
  },
  emits: ['paginateTo'],
  computed: {
    paginationData() {
      return calculatePagination(
        this.pagination?.page ?? 1,
        this.pagination?.size ?? 0,
        this.pagination?.total ?? 0
      );
    },
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
