<template>
  <div class="overflow-y-auto flex-1">
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

<script setup lang="ts">
import { useSlots } from 'vue';
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';

const slots = useSlots();

const isColgroupColsSlotDefined = slots['colgroup-cols'] != null;
const isHeaderColsSlotDefined = slots['header-cols'] != null;
const isBodyRowsSlotDefined = slots['body-rows'] != null;
</script>

<style>
.data-table {
  @apply w-full border-separate table-fixed;
  border-spacing: 0;
}
.data-table th,
.data-table td {
  @apply border;
}
.data-table tbody tr {
  @apply align-top;
}
</style>
