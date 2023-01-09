<template>
  <TableCustom class="overflow-y-auto">
    <colgroup v-if="isColgroupColsSlotDefined">
      <slot name="colgroup-cols"></slot>
    </colgroup>
    <TableHeader v-if="isHeaderColsSlotDefined" class="sticky top-0 z-10">
      <slot name="header-cols"></slot>
    </TableHeader>
    <TableBody v-if="isBodyRowsSlotDefined">
      <slot name="body-rows"></slot>
    </TableBody>
  </TableCustom>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';
import TableCustom from './TableCustom.vue';

const slots = useSlots();

const isColgroupColsSlotDefined = slots['colgroup-cols'] != null;
const isHeaderColsSlotDefined = slots['header-cols'] != null;
const isBodyRowsSlotDefined = slots['body-rows'] != null;
</script>
