<template>
  <div v-if="pagination != null">
    <div>
      <Button
        v-if="pagination.hasPrevious"
        class="btn btn-blue"
        @click="$emit('paginatePrevious')"
        >Previous</Button
      >
      <Button
        v-if="pagination.hasNext"
        class="btn btn-blue"
        @click="$emit('paginateNext')"
        >Next</Button
      >
    </div>
    <ul>
      <li>Total results: {{ pagination.TotalResults }}</li>
      <li>Total pages: {{ pagination.TotalPages }}</li>
      <li>Current page: {{ pagination.CurrentPage }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { TourismPagination } from '../../lib/pagination/tourism.pagination';

export default Vue.extend({
  props: {
    pagination: {
      type: Object as PropType<TourismPagination>,
      default: null,
    },
  },
});
</script>
