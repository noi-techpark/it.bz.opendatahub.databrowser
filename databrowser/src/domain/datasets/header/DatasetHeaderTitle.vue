<template>
  <DatasetTitle :dataset="datasetTitleInfo" :link-to-parent="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { useMetaDataForCurrentRoute } from '../../metaDataConfig/tourism/useMetaData';
import DatasetTitle from '../common/DatasetTitle.vue';

const datasetConfigStore = useDatasetConfigStore();
const { currentMetaData } = useMetaDataForCurrentRoute();

const datasetTitleInfo = computed(
  () =>
    currentMetaData.value ?? {
      shortname: datasetConfigStore.config?.description?.title ?? 'Untitled',
    }
);
</script>
