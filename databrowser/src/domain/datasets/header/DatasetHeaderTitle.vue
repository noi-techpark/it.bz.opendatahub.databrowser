<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DatasetTitle :dataset="datasetTitleInfo" :link-to-parent="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { useDatasetConfigStore } from '../../datasetConfig/datasetConfigStore';
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
