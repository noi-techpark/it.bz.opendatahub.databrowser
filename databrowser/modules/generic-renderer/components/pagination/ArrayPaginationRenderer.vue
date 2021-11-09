<template>
  <div v-if="pagination != null">
    Showing all {{ pagination.total }} results
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ArrayPagination } from '../../lib/pagination/array.pagination';

export default Vue.extend({
  props: {
    pagination: {
      type: Object as PropType<ArrayPagination>,
      default: null,
    },
  },
});
</script>
