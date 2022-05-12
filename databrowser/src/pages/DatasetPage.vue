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

    <ContentDivider />

    <div class="flex overflow-y-auto h-full">
      <div class="flex overflow-x-auto flex-col flex-1">
        <template v-if="!isLoading">
          <ContentAlignmentX>
            <DatasetHeader :view-config="viewConfig" />
          </ContentAlignmentX>
        </template>

        <template v-if="viewConfig != null">
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
      </div>
    </div>
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
import { ViewConfig } from '../domain/viewConfig/types';
import DatasetHeader from '../domain/datasets/header/DatasetHeader.vue';
import DatasetNavigation from '../domain/datasets/header/DatasetNavigation.vue';
import QuickView from '../domain/datasets/quickView/QuickView.vue';

const route = useRoute();

const viewConfig = ref<ViewConfig | undefined>();
const isTableView = ref(false);
const isDetailView = ref(false);
const isRawView = ref(false);
const isQuickView = ref(false);
const isLoading = ref(true);

const configProvider = useViewConfigProvider();
watch(
  () => configProvider.currentViewConfig.value,
  async (currentViewConfig) => {
    const viewConfigResult = currentViewConfig;

    isTableView.value = false;
    isDetailView.value = false;
    isRawView.value = false;
    isQuickView.value = false;

    if (isViewConfig(viewConfigResult)) {
      viewConfig.value = viewConfigResult;

      const viewType = viewConfig.value.renderConfig.type;

      if (viewType === 'list') {
        isTableView.value = true;
      } else if (route.name === 'DatasetRawPage') {
        isRawView.value = true;
      } else if (route.name === 'DatasetQuickPage') {
        isQuickView.value = true;
      } else {
        isDetailView.value = true;
      }
    } else {
      viewConfig.value = undefined;
    }

    isLoading.value = false;
  }
);

const error = ref<Error>();

onErrorCaptured((hook) => {
  console.error('--------ERROR CAPTURED', hook);
  error.value = hook;
});
</script>
