<template>
  <div class="flex space-x-3">
    <PillLink
      :to="{
        name: 'DatasetsTableViewPage',
        params: { datasetType },
      }"
      :active="isTableActive"
      >Table view</PillLink
    >
    <PillLink
      v-if="!isTableActive"
      :to="{
        name: 'DatasetsDetailViewPage',
        params: { datasetType, datasetId },
      }"
      :active="isDetailActive"
      >Detail view</PillLink
    >
    <PillButton v-else disabled>Detail view </PillButton>
    <PillLink
      v-if="!isTableActive"
      :to="{
        name: 'DatasetsRawViewPage',
        params: { datasetType, datasetId },
      }"
      :active="isRawActive"
      >Raw Data</PillLink
    >
    <PillButton v-else disabled>Raw view </PillButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import PillLink from '../../../components/pill/PillLink.vue';
import PillButton from '../../../components/pill/PillButton.vue';
import { ViewPill } from './types';
import { computed } from 'vue';

export default defineComponent({
  components: {
    PillButton,
    PillLink,
  },
  props: {
    view: {
      type: String as PropType<ViewPill>,
      required: true,
    },
    datasetType: {
      type: String,
      required: true,
    },
    datasetId: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const isTableActive = computed(() => props.view === ViewPill.table);
    const isDetailActive = computed(() => props.view === ViewPill.detail);
    const isRawActive = computed(() => props.view === ViewPill.raw);

    return {
      isTableActive,
      isDetailActive,
      isRawActive,
    };
  },
});
</script>
