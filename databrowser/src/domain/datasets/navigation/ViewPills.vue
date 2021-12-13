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
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    PillButton,
    PillLink,
  },
  props: {
    currentView: {
      type: String as PropType<ViewPill>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const datasetType = route.params.datasetType as string;
    const datasetId = route.params.datasetId as string;

    const isTableActive = computed(() => props.currentView === ViewPill.table);
    const isDetailActive = computed(
      () => props.currentView === ViewPill.detail
    );
    const isRawActive = computed(() => props.currentView === ViewPill.raw);

    return {
      datasetType,
      datasetId,
      isTableActive,
      isDetailActive,
      isRawActive,
    };
  },
});
</script>
