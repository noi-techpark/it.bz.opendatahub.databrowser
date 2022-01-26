<template>
  <tr v-for="rindex in rows" :key="rindex" class="w-full">
    <TableCell v-for="cindex in cells" :key="cindex">
      <div class="w-2/3 h-5 bg-gray-200 rounded animate-pulse"></div>
    </TableCell>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import TableCell from './TableCell.vue';

withDefaults(
  defineProps<{
    rows?: number;
    cells?: number;
  }>(),
  {
    rows: 3,
    cells: 2,
  }
);
</script>
