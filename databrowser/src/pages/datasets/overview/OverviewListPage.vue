<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <AppLayout>
    <PageGridContent class="grow gap-3 lg:gap-3">
      <div class="flex gap-4">
        <div class="w-64" />
        <div class="flex">
          <h1 class="grow text-2xl font-semibold">
            {{ tourismDatasets?.length || '...' }}
            {{
              tourismDatasets?.length === 1
                ? t('overview.listPage.datasetFound')
                : t('overview.listPage.datasetsFound')
            }}
          </h1>
        </div>
      </div>

      <div class="flex w-full gap-4">
        <div class="w-64 border border-gray-300">
          <div>
            <h3 class="py-2 px-4 text-2xl font-semibold">
              {{ t('overview.listPage.filter') }}
            </h3>
          </div>
          <div class="truncate border-t border-gray-300 py-2 px-4">
            <ToggleCustom />
            {{ $t('overview.listPage.noMetadataAvailable') }}
          </div>
          <div class="truncate border-t border-gray-300 py-2 px-4">
            <ToggleCustom />
            {{ $t('overview.listPage.deprecated') }}
          </div>
        </div>
        <div class="flex w-full flex-col gap-4">
          <div v-if="isOtherDatasetsLoading" class="animate-pulse">
            {{ t('overview.listPage.loadOtherDatasets') }}
          </div>
          <template v-else>
            <OverviewCardItem
              v-for="(dataset, index) in tourismDatasets"
              :key="index"
              :dataset="dataset"
              :data-test="`dataset-card-${dataset.id}`"
              class="break-words"
            />
          </template>
        </div>
      </div>

      <CardDivider />

      <PartnersAndContributors />
    </PageGridContent>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../../../layouts/AppLayout.vue';
import HeroContainer from '../../../components/hero/HeroContainer.vue';
import HeroTitle from '../../../components/hero/HeroTitle.vue';
import SelectWithLabel from '../../../components/select/SelectWithLabel.vue';
import OverviewCardItem from './OverviewCardItem.vue';
import PartnersAndContributors from '../../../components/partners/PartnersAndContributors.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import PageGridContent from '../../../components/content/PageGridContent.vue';
import { useI18n } from 'vue-i18n';
import { useMetaDataDatasets, useOtherDatasets } from './useDatasets';
import ToggleCustom from '../../../components/toggle/ToggleCustom.vue';

const { t } = useI18n();

const { metaDataDatasets, accessTypeOptions, currentAccessType } =
  useMetaDataDatasets();

const { isOtherDatasetsLoading, tourismDatasets } =
  useOtherDatasets(metaDataDatasets);
</script>
