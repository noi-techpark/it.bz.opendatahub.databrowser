<template>
  <AppLayout>
    <ContentAlignmentX>
      <h1 class="text-2xl font-semibold">Available list endpoints</h1>
      <span
        >Disclaimer: some items in this list are generated automatically from
        OpenAPI resources. You can distinguish them by their
        <span class="text-red-500">(generated)</span> label. Some items with
        this label may not work properly.</span
      >
      <div v-if="isLoading" class="animate-pulse">
        {{ t('datasets.info.loadingConfig') }}
      </div>
      <template v-else>
        <div
          v-for="(viewConfigsWithPathParams, key) in allViewConfigs"
          :key="key"
          class="mt-3"
        >
          <h2 class="text-xl font-semibold uppercase">{{ key }}</h2>
          <ul>
            <li
              v-for="(
                viewConfigWithPathParams, index
              ) of viewConfigsWithPathParams"
              :key="index"
              class="py-1 px-4"
            >
              <router-link
                :to="{
                  name: 'DatasetTableAndDetailPage',
                  params: {
                    pathParams: viewConfigWithPathParams.pathParams,
                  },
                }"
                >{{ viewConfigWithPathParams.viewConfig.description?.title }}
                <span
                  :class="{
                    'text-red-500':
                      viewConfigWithPathParams.viewConfig.source ===
                      'generated',
                  }"
                  >({{ viewConfigWithPathParams.viewConfig.source }})</span
                ></router-link
              >
            </li>
          </ul>
        </div>
      </template>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useViewConfigProvider } from '../domain/viewConfig';
import { ViewConfigWithPathParams } from '../domain/viewConfig/types';
import AppLayout from '../layouts/AppLayout.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isLoading = ref(true);

const configProvider = useViewConfigProvider();
const allViewConfigs = ref<Record<string, ViewConfigWithPathParams[]>>({});

configProvider
  .getAllViewConfigs()
  .then((vcs) =>
    // Remove all view configs that require a path param because there is
    // no general way to set such path params
    Object.entries(vcs).reduce<Record<string, ViewConfigWithPathParams[]>>(
      (prev, [key, value]) => ({
        ...prev,
        [key]: value.filter((v) => !v.viewConfig.path.match('\\{.*\\}')),
      }),
      {}
    )
  )
  .then((vcs) => {
    allViewConfigs.value = vcs;
    isLoading.value = false;
  });
</script>
