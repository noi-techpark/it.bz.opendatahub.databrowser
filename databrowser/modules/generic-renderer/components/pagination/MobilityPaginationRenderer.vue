<template>
  <div v-if="pagination != null">
    <!-- TODO: check if needed, otherwise remove -->
    <!-- <div>
      <label><span>Offset</span><input v-model="offset" /></label>
      <label><span>Limit</span><input v-model="limit" /></label>
      <Button class="btn btn-blue" @click="paginate()">Paginate</Button>
    </div> -->
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
      <li>Offset: {{ pagination.offset }}</li>
      <li>Limit: {{ pagination.limit }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { MobilityPagination } from '../../lib/pagination/mobility.pagination';

export default Vue.extend({
  props: {
    pagination: {
      type: Object as PropType<MobilityPagination>,
      default: null,
    },
  },
  data() {
    return {
      offset: this.pagination.offset,
      limit: this.pagination.limit,
    };
  },
  watch: {
    pagination(newPagination: MobilityPagination) {
      this.offset = newPagination.offset;
      this.limit = newPagination.limit;
    },
  },
  // TODO: check if needed, otherwise remove
  // methods: {
  //   paginate() {
  //     console.log(`paginate to offset=${this.offset}, limit=${this.limit}`);
  //   },
  // },
});
</script>
