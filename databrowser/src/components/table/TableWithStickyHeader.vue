<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <colgroup v-if="isColgroupColsSlotDefined">
        <slot name="colgroup-cols"></slot>
      </colgroup>
      <TableHeader v-if="isHeaderColsSlotDefined" class="sticky top-0 z-10">
        <slot name="header-cols"></slot>
      </TableHeader>
      <TableBody v-if="isBodyRowsSlotDefined">
        <slot name="body-rows"></slot>
      </TableBody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TableColumnConfig } from '../../../config/types';
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';

export default defineComponent({
  components: {
    TableBody,
    TableHeader,
  },
  props: {
    rows: {
      default: () => [],
      type: [Array] as PropType<any[]>,
    },
    config: {
      default: () => [],
      type: Array as PropType<TableColumnConfig[]>,
    },
  },
  setup(props, { slots }) {
    const isColgroupColsSlotDefined = slots['colgroup-cols'] != null;
    const isHeaderColsSlotDefined = slots['header-cols'] != null;
    const isBodyRowsSlotDefined = slots['body-rows'] != null;

    return {
      isColgroupColsSlotDefined,
      isHeaderColsSlotDefined,
      isBodyRowsSlotDefined,
    };
  },
});
</script>

<style>
.data-table-wrapper {
  @apply overflow-auto my-6 rounded-xl rounded-tr-none border-r border-b border-l;
}
/* original solution: https://stackoverflow.com/a/68166503 */
.data-table {
  @apply w-full border-separate table-fixed;
  border-spacing: 0;
}
.data-table thead th:nth-last-child(2)::before,
.data-table thead th:first-child::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: theme('spacing.3');
  background-image: linear-gradient(
      to bottom,
      transparent theme('spacing.3'),
      theme('colors.gray.200') 0
    ),
    radial-gradient(
      circle at theme('spacing.3') theme('spacing.3'),
      theme('colors.gray.200') theme('spacing.3'),
      theme('colors.white') 0
    );
  background-position: top left;
  background-size: theme('spacing.6') 100%,
    theme('spacing.6') theme('spacing.6');
  background-repeat: no-repeat;
}
.data-table thead th:nth-last-child(2) {
  @apply relative;
}
.data-table thead th:nth-last-child(2)::before {
  @apply left-auto right-0 bg-right-top;
}
.data-table tbody tr {
  @apply align-top;
}
.data-table tbody tr:not(:first-child) td {
  @apply border-t;
}
.data-table tbody td:last-child {
  @apply border-l;
}

.dataset-link {
  @apply flex justify-center items-center m-1 w-8 h-8 hover:bg-gray-300 rounded border;
}
</style>
