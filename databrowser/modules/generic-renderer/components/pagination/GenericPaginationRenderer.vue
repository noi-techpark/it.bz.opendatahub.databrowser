<template>
  <div v-if="pagination != null">
    <div v-if="isArrayPagination">
      <ArrayPaginationRenderer :pagination="pagination" />
    </div>
    <div v-else-if="isMobilityPagination">
      <MobilityPaginationRenderer
        :pagination="pagination"
        @paginatePrevious="$emit('paginatePrevious')"
        @paginateNext="$emit('paginateNext')"
      />
    </div>
    <div v-else-if="isTourismPagination">
      <TourismPaginationRenderer
        :pagination="pagination"
        @paginatePrevious="$emit('paginatePrevious')"
        @paginateNext="$emit('paginateNext')"
      />
    </div>
    <div v-else>Unknown pagination type, no pagination shown</div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import {
  BasePagination,
  PaginationType,
} from '../../lib/pagination/pagination';
import ArrayPaginationRenderer from './ArrayPaginationRenderer.vue';
import MobilityPaginationRenderer from './MobilityPaginationRenderer.vue';
import TourismPaginationRenderer from './TourismPaginationRenderer.vue';

export default Vue.extend({
  components: {
    ArrayPaginationRenderer,
    MobilityPaginationRenderer,
    TourismPaginationRenderer,
  },
  props: {
    pagination: {
      type: Object as PropType<BasePagination>,
      default: null,
    },
  },
  computed: {
    isArrayPagination(): boolean {
      return this.pagination.type === PaginationType.ARRAY;
    },
    isMobilityPagination(): boolean {
      return this.pagination.type === PaginationType.MOBILITY;
    },
    isTourismPagination(): boolean {
      return this.pagination.type === PaginationType.TOURISM;
    },
  },
});
</script>
