<template>
  <AppLayout :show-app-footer="false">
    <div v-if="error != null" class="bg-red-100">
      <h2>ERROR</h2>
      {{ JSON.stringify(error) }}
    </div>

    <ContentAlignmentX>
      <div v-if="isLoading" class="animate-pulse">
        {{ $t('datasets.info.loadingConfig') }}
      </div>
    </ContentAlignmentX>

    <template v-if="viewConfig != null">
      <ContentDivider />
      <ContentAlignmentX>
        <DatasetHeader :view-config="viewConfig" />
      </ContentAlignmentX>
      <template v-if="currentView != null">
        <TableView v-if="isTableView" :view-config="viewConfig" />
        <template v-if="isDetailView || isRawView || isQuickView">
          <ContentDivider />
          <DatasetNavigation />
          <ContentDivider />
          <section class="flex overflow-y-auto flex-col">
            <DetailView v-if="isDetailView" :view-config="viewConfig" />
            <RawView v-if="isRawView" :view-config="viewConfig" />
            <QuickView v-if="isQuickView" :view-config="viewConfig" />
          </section>
        </template>
      </template>
    </template>

    <ContentAlignmentX v-if="noViewConfig != null">
      <span>No config: {{ noViewConfig?.reason }}</span>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref, watch } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import ContentDivider from '../components/content/ContentDivider.vue';
import TableView from '../domain/datasets/tableView/TableView.vue';
import DetailView from '../domain/datasets/detailView/DetailView.vue';
import RawView from '../domain/datasets/rawView/RawView.vue';
import { useRoute } from 'vue-router';
import { isViewConfig, useViewConfigProvider } from '../domain/viewConfig';
import { NoViewConfig, ViewConfig } from '../domain/viewConfig/types';
import DatasetHeader from '../domain/datasets/header/DatasetHeader.vue';
import DatasetNavigation from '../domain/datasets/header/DatasetNavigation.vue';
import QuickView from '../domain/datasets/quickView/QuickView.vue';

const route = useRoute();

const viewConfig = ref<ViewConfig | null>(null);
const noViewConfig = ref<NoViewConfig | null>(null);
const isTableView = ref(false);
const isDetailView = ref(false);
const isRawView = ref(false);
const isQuickView = ref(false);
const currentView = ref<'table' | 'detail' | 'raw' | 'quick' | null>(null);
const isLoading = ref(true);

const configProvider = useViewConfigProvider();
watch(
  () => configProvider.currentViewConfig.value,
  async (currentViewConfig) => {
    console.log('VIEW CONFIG', currentViewConfig);
    const viewConfigResult = currentViewConfig;

    if (isViewConfig(viewConfigResult)) {
      viewConfig.value = viewConfigResult;
      noViewConfig.value = null;

      const viewType = viewConfig.value.renderConfig.type;

      if (viewType === 'list') {
        currentView.value = 'table';
      } else if (route.name === 'DatasetRawPage') {
        currentView.value = 'raw';
      } else if (route.name === 'DatasetQuickPage') {
        currentView.value = 'quick';
      } else {
        currentView.value = 'detail';
      }
    } else {
      viewConfig.value = null;
      noViewConfig.value = viewConfigResult;
      currentView.value = null;
    }

    isTableView.value = currentView.value === 'table';
    isDetailView.value = currentView.value === 'detail';
    isRawView.value = currentView.value === 'raw';
    isQuickView.value = currentView.value === 'quick';

    isLoading.value = false;
  }
);

const error = ref<Error>();

onErrorCaptured((hook) => {
  console.log('--------ERROR CAPTURED', hook);

  error.value = hook;
});
</script>
