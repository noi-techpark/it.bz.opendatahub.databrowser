<template>
  <tr v-for="rindex in rows" :key="rindex" class="w-full">
    <TableCell v-for="cindex in cells" :key="cindex">
      <div class="w-2/3 h-5 bg-gray-200 rounded animate-pulse"></div>
    </TableCell>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TableCell from './TableCell.vue';

export default defineComponent({
  components: { TableCell },
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    cells: {
      type: Number,
      default: 2,
    },
  },
});
</script>
