<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DatasetTitle :dataset="datasetTitleInfo" :link-to-parent="true" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DatasetTitle from '../common/DatasetTitle.vue';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { useMetaDataStore } from '../../metaDataConfig/tourism/metaDataStore';
import { storeToRefs } from 'pinia';

const { description } = storeToRefs(useDatasetInfoStore());
const { currentMetaData } = storeToRefs(useMetaDataStore());

const datasetTitleInfo = computed(
  () =>
    currentMetaData.value ?? {
      shortname: description.value?.title ?? 'Untitled',
    }
);
</script>
