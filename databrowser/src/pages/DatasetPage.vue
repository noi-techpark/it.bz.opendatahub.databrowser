<template>
  <AppLayout :show-app-footer="false">
    <div v-if="error != null" class="bg-red-100">
      <h2>ERROR</h2>
      {{ JSON.stringify(error) }}
    </div>

    <div
      v-if="datasetConfigStore.resolution.state === 'error'"
      class="bg-red-100"
    >
      <h2>ERROR</h2>
      {{ JSON.stringify(datasetConfigStore.resolution.error) }}
    </div>

    <ContentAlignmentX>
      <div
        v-if="datasetConfigStore.resolution.state === 'pending'"
        class="animate-pulse"
      >
        {{ t('datasets.info.loadingConfig') }}
      </div>
    </ContentAlignmentX>

    <ContentDivider />

    <div class="flex overflow-y-auto h-full">
      <div class="flex overflow-x-auto flex-col flex-1">
        <template v-if="datasetConfigStore.resolution.state === 'success'">
          <ContentAlignmentX>
            <DatasetHeader />
          </ContentAlignmentX>
        </template>
        <template v-if="datasetConfigStore.config != null">
          <TableView v-if="datasetConfigStore.isTableView" />
          <template v-else>
            <ContentDivider />
            <DatasetNavigation />
            <ContentDivider />
            <section class="flex overflow-y-auto flex-col">
              <DetailView v-if="datasetConfigStore.isDetailView" />
              <RawView v-if="datasetConfigStore.isRawView" />
              <QuickView v-if="datasetConfigStore.isQuickView" />
              <EditView v-if="datasetConfigStore.isEditView" />
            </section>
          </template>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import TableView from '../domain/datasets/tableView/TableView.vue';
import DetailView from '../domain/datasets/detailView/DetailView.vue';
import RawView from '../domain/datasets/rawView/RawView.vue';
import DatasetHeader from '../domain/datasets/header/DatasetHeader.vue';
import DatasetNavigation from '../domain/datasets/header/DatasetNavigation.vue';
import QuickView from '../domain/datasets/quickView/QuickView.vue';
import { useI18n } from 'vue-i18n';
import EditView from '../domain/datasets/editView/EditView.vue';
import { useDatasetConfigStore } from '../domain/datasetConfig/store/datasetConfigStore';
import { useRouter } from 'vue-router';
import { useConfigRouterWatcher } from '../domain/datasetConfig/routerWatcher';

const { t } = useI18n();

const router = useRouter();
useConfigRouterWatcher(router);

const datasetConfigStore = useDatasetConfigStore();

const error = ref<Error>();

onErrorCaptured((hook) => {
  console.error('--------ERROR CAPTURED', hook);
  error.value = hook;
});
</script>
