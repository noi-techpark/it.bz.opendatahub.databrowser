<template>
  <AppLayout :show-app-footer="false">
    <div v-if="error != null">
      <AlertError :title="'Error!'" :content="error.message" />
    </div>

    <div v-if="datasetConfigStore.resolution.state === 'error'">
      <AlertError
        :title="'Error!'"
        :content="datasetConfigStore.resolution.error"
      />
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
          <slot></slot>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetHeader from '../../domain/datasets/header/DatasetHeader.vue';
import { useI18n } from 'vue-i18n';
import { useDatasetConfigStore } from '../../domain/datasetConfig/store/datasetConfigStore';
import { useRouter } from 'vue-router';
import { useConfigRouterWatcher } from '../../domain/datasetConfig/routerWatcher';
import AlertError from '../../components/alert/AlertError.vue';

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
