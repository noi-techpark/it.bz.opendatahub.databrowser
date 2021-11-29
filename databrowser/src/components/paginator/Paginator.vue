<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div v-if="pagination != null">
    <ul>
      <li>Total results: {{ pagination.total }}</li>
      <li>page: {{ pagination.page }}</li>
      <li>size: {{ pagination.size }}</li>
    </ul>
    <pre class="hidden">{{ paginationData }}</pre>
    <div v-if="paginationData" class="flex">
      <button
        :disabled="paginationData.previous.isDisabled"
        class="rounded-2xl border next-previous-button"
        :class="{ 'text-gray-200': paginationData?.previous.isDisabled }"
        @click="$emit('paginateTo', paginationData?.previous.indexNumber)"
      >
        &lt;
      </button>
      <ul class="flex border">
        <li v-for="item in paginationData.pages" :key="item.indexNumber">
          <button
            type="button"
            class="page-button"
            style="margin: -1px"
            :class="{
              'border border-green-200': item.isCurrent,
            }"
            @click="$emit('paginateTo', item.indexNumber)"
          >
            {{ item.displayNumber }}
          </button>
        </li>
      </ul>
      <button
        :disabled="paginationData.next.isDisabled"
        class="rounded-2xl border next-previous-button"
        :class="{ 'text-gray-200': paginationData?.next.isDisabled }"
        @click="$emit('paginateTo', paginationData?.next.indexNumber)"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { calculatePagination } from '@aboutbits/pagination';
import { defineComponent, PropType } from '@vue/runtime-core';
import { Pagination } from '../../domain/api/types';

export default defineComponent({
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
.page-button {
  height: 35px;
  width: 30px;
}
.next-previous-button {
  height: 35px;
  width: 35px;
}
.border-left-transparent {
  border-left-color: transparent;
}
.border-right-transparent {
  border-right-color: transparent;
}
</style>
