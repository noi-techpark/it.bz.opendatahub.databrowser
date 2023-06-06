<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
          v-for="(configsForDomain, domain) in configs"
          :key="domain"
          class="mt-3"
        >
          <h2 class="text-xl font-semibold uppercase">{{ domain }}</h2>
          <ul>
            <li
              v-for="(config, index) of configsForDomain"
              :key="index"
              class="py-1 px-4"
            >
              <router-link
                :to="{
                  name: DatasetPage.TABLE,
                  params: {
                    domain: config.route.domain,
                    pathParams: config.route.pathParams,
                  },
                }"
                >{{ config.description?.title }}
                <span
                  :class="{
                    'text-red-500': config.source === 'generated',
                  }"
                  >({{ config.source }})</span
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
import { DatasetConfig, DatasetDomain } from '../domain/datasetConfig/types';
import AppLayout from '../layouts/AppLayout.vue';
import ContentAlignmentX from '../components/content/ContentAlignmentX.vue';
import { useI18n } from 'vue-i18n';
import { getDatasetConfigSources } from '../domain/datasetConfig/resolver';
import { DatasetPage } from '../routes';

const { t } = useI18n();

const isLoading = ref(true);

const configs = ref<Record<DatasetDomain, DatasetConfig[]>>({});

const promises = getDatasetConfigSources().map((source) =>
  source.getAllDatasetConfigs()
);

Promise.all(promises).then((sources) => {
  const configsByDomain = sources.reduce<
    Record<DatasetDomain, DatasetConfig[]>
  >((previous, current) => {
    Object.keys(current).forEach((domain) => {
      const domainConfigs = previous[domain];
      previous[domain] =
        domainConfigs != null
          ? [...domainConfigs, ...current[domain]]
          : [...current[domain]];
    });
    return previous;
  }, {});

  Object.values(configsByDomain).forEach((configs) =>
    configs.sort((a, b) => {
      // Sort by source; inside same source, sort by description title
      if (a.source != b.source) {
        return a.source === 'embedded' ? -1 : 1;
      }
      const aTitle = a.description.title ?? '';
      const bTitle = b.description.title ?? '';

      return aTitle.localeCompare(bTitle);
    })
  );

  configs.value = configsByDomain;
  isLoading.value = false;
});
</script>
