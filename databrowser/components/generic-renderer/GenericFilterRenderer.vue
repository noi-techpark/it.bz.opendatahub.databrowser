<template>
  <div>
    <h3 class="text-xl mt-4">Filter</h3>
    <databrowser-generic-filter
      class="generic-element"
      :parameters.prop="filterParameters"
      @filterChanges="$emit('filterChanges', $event)"
    ></databrowser-generic-filter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    filterParameters: {
      type: Array,
      default: null,
    },
  },
});
</script>

<style>
@import './generic-renderer.css';
</style>
