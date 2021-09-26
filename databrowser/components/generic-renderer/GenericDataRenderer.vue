<template>
  <!-- If filteredData is a pageable list, use generic list Web Component -->
  <div v-if="isPageableList(filteredData)">
    <h3 class="text-xl mt-4">List data</h3>
    <databrowser-generic-list
      class="generic-element"
      :data.prop="filteredData"
      :config.prop="renderConfig"
      @paginationChanges="$emit('paginationChanges', $event)"
    ></databrowser-generic-list>
  </div>
  <!-- If filteredData is a resource, use generic resource Web Component -->
  <div v-else-if="isResource(filteredData)">
    <h3 class="text-xl mt-4">Resource data</h3>
    <databrowser-generic-resource
      class="generic-element"
      :data.prop="filteredData"
      :config.prop="renderConfig"
      @paginationChanges="$emit('paginationChanges', $event)"
    ></databrowser-generic-resource>
  </div>
  <!--
        If filteredData is not null and no other option before matches, render as JSON.
        Note that this case should not happen, but nevertheless it is better to
        show some output in case the assumtion is not correct
      -->
  <div v-else>
    <h3 class="text-xl mt-4">Unknown data, rendering as JSON</h3>
    <div class="block overflow-auto" style="height: calc(100vh - 250px)">
      {{ JSON.stringify(filteredData) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { PageableList } from '~/../web-components/databrowser-generic/src/generic/GenericList';

export default Vue.extend({
  props: {
    filteredData: {
      type: Object,
      default: null,
    },
    filterParameters: {
      type: Array,
      default: null,
    },
    renderConfig: {
      type: Object,
      default: null,
    },
  },
  methods: {
    isResource(data?: PageableList | null) {
      return data != null && data instanceof Object;
    },
    isPageableList(data?: PageableList | null) {
      if (data == null) {
        return false;
      }
      return data.TotalResults != null;
    },
  },
});
</script>

<style>
@import './generic-renderer.css';
</style>
