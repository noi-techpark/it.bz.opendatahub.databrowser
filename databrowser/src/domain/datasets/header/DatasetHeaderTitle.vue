<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DatasetTitle :dataset="datasetTitleInfo" :link-to-parent="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMetaDataForCurrentRoute } from '../../metaDataConfig/tourism/useMetaData';
import DatasetTitle from '../common/DatasetTitle.vue';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';

const { description } = useDatasetConfigStore();
const { currentMetaData } = useMetaDataForCurrentRoute();

const datasetTitleInfo = computed(
  () =>
    currentMetaData.value ?? {
      shortname: description?.title ?? 'Untitled',
    }
);
</script>
