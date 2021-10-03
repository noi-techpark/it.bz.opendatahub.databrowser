<template>
  <!-- If filteredData is a list, use generic list Web Component -->
  <div v-if="isList(data)">
    <h3 class="text-xl mt-4">List data</h3>
    <databrowser-generic-list
      class="generic-element"
      :data.prop="data"
      :config.prop="renderConfig"
      @paginationChanges="$emit('paginationChanges', $event)"
    ></databrowser-generic-list>
  </div>
  <!-- If filteredData is a resource, use generic resource Web Component -->
  <div v-else-if="isResource(data)">
    <h3 class="text-xl mt-4">Resource data</h3>
    <databrowser-generic-resource
      class="generic-element"
      :data.prop="data"
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
      {{ JSON.stringify(data) }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

type DataProp = any[] | Record<string, any> | null | undefined;

export default Vue.extend({
  props: {
    data: {
      type: [Object, Array] as PropType<DataProp>,
      default: null,
    },
    renderConfig: {
      type: Object,
      default: null,
    },
  },
  methods: {
    isResource(data: DataProp) {
      return data != null && typeof data === 'object';
    },
    isList(data: DataProp) {
      return Array.isArray(data);
    },
  },
});
</script>

<style>
@import './generic-renderer.css';
</style>
