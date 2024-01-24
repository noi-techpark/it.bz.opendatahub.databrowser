<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DatasetTitle :dataset="datasetTitleInfo" :link-to-parent="true" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useMetaDataStore } from '../../../metaDataConfig/tourism/metaDataStore';
import { useDatasetBaseInfoStore } from '../../config/store/datasetBaseInfoStore';
import DatasetTitle from '../common/DatasetTitle.vue';

const { description } = storeToRefs(useDatasetBaseInfoStore());
const { currentMetaData } = storeToRefs(useMetaDataStore());

const datasetTitleInfo = computed(
  () =>
    currentMetaData.value ?? {
      shortname: description.value?.title ?? 'Untitled',
    }
);
</script>
