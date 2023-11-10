<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AppLayout :show-app-footer="false">
    <div v-if="isError">
      <AlertError :title="'Error!'" :content="error?.message" />
    </div>

    <ContentDivider />

    <div class="flex h-full overflow-y-auto">
      <div class="flex flex-1 flex-col overflow-x-auto">
        <ContentAlignmentX>
          <DatasetHeader />
        </ContentAlignmentX>
        <template v-if="hasConfig">
          <slot></slot>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue';
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetHeader from '../../domain/datasets/header/DatasetHeader.vue';
import AlertError from '../../components/alert/AlertError.vue';
import { useDatasetInfoStore } from '../../domain/datasetConfig/store/datasetInfoStore';
import { storeToRefs } from 'pinia';

const { hasConfig, isError, error } = storeToRefs(useDatasetInfoStore());

onErrorCaptured((hook) => {
  console.error('--------ERROR CAPTURED', hook);
  error.value = hook;
});
</script>
