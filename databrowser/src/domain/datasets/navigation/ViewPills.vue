<template>
  <div class="flex space-x-3">
    <PillLink
      :to="{
        name: 'DatasetsTableViewPage',
        params: { datasetType },
        query: { language },
      }"
      :active="isTableActive"
      >Table view</PillLink
    >
    <PillLink
      v-if="!isTableActive"
      :to="{
        name: 'DatasetsDetailViewPage',
        params: { datasetType, datasetId },
        query: { language },
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
        query: { language },
      }"
      :active="isRawActive"
      >Raw Data</PillLink
    >
    <PillButton v-else disabled>Raw view </PillButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import PillLink from '../../../components/pill/PillLink.vue';
import PillButton from '../../../components/pill/PillButton.vue';
import { ViewPill } from './types';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useApiQuery } from '../../api/service/apiQueryHandler';

const props = defineProps<{
  currentView: ViewPill;
}>();

const { currentView } = toRefs(props);

const route = useRoute();
const datasetType = route.params.datasetType as string;
const datasetId = route.params.datasetId as string;

const isTableActive = computed(() => currentView.value === ViewPill.table);
const isDetailActive = computed(() => currentView.value === ViewPill.detail);
const isRawActive = computed(() => currentView.value === ViewPill.raw);

const language = useApiQuery().useApiParameter('language');
</script>
