<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AppLayout :show-app-footer="false">
    <div v-if="error != null">
      <AlertError :title="'Error!'" :content="error.message" />
    </div>

    <div v-if="datasetConfigStore.isError">
      <AlertError :title="'Error!'" :content="datasetConfigStore.error" />
    </div>

    <ContentDivider />

    <div class="flex h-full overflow-y-auto">
      <div class="flex flex-1 flex-col overflow-x-auto">
        <ContentAlignmentX>
          <DatasetHeader />
        </ContentAlignmentX>
        <template v-if="datasetConfigStore.config != null">
          <slot></slot>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref, watch } from 'vue';
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetHeader from '../../domain/datasets/header/DatasetHeader.vue';
import { useDatasetConfigStore } from '../../domain/datasetConfig/datasetConfigStore';
import AlertError from '../../components/alert/AlertError.vue';
import { useRouter } from 'vue-router';

const datasetConfigStore = useDatasetConfigStore();

const router = useRouter();
watch(
  () => router.currentRoute.value,
  async (route, oldRoute) => {
    console.log('DatasetBaseLayout route updated', route, oldRoute);
    datasetConfigStore.changeRoute(route, oldRoute);
  },
  { immediate: true }
);

const error = ref<Error>();

onErrorCaptured((hook) => {
  console.error('--------ERROR CAPTURED', hook);
  error.value = hook;
});
</script>
