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
        <DetailView v-if="isDetailView" :view-config="viewConfig" />
        <RawView v-if="isRawView" :view-config="viewConfig" />
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

const route = useRoute();

const viewConfig = ref<ViewConfig | null>(null);
const noViewConfig = ref<NoViewConfig | null>(null);
const isTableView = ref(false);
const isDetailView = ref(false);
const isRawView = ref(false);
const currentView = ref<'table' | 'detail' | 'raw' | null>(null);
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
      } else {
        const isRaw = route.name === 'DatasetRawPage';
        currentView.value = isRaw ? 'raw' : 'detail';
      }
    } else {
      viewConfig.value = null;
      noViewConfig.value = viewConfigResult;
      currentView.value = null;
    }

    isTableView.value = currentView.value === 'table';
    isDetailView.value = currentView.value === 'detail';
    isRawView.value = currentView.value === 'raw';

    isLoading.value = false;
  }
);

const error = ref<Error>();

onErrorCaptured((hook) => {
  console.log('--------ERROR CAPTURED', hook);

  error.value = hook;
});
</script>
