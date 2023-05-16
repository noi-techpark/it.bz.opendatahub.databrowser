<template>
  <AppLayout>
    <HeroContainer>
      <HeroTitle>
        {{ t('overview.listPage.listOfAllDatasets') }}
      </HeroTitle>
      <router-link
        to="/links"
        class="text-green-500"
        data-test="all-endpoints-link"
      >
        {{ t('overview.listPage.showAllEndpoints') }}
      </router-link>
    </HeroContainer>

    <PageGridContent class="grow">
      <SelectWithLabel
        id="access-of-data"
        class="md:w-1/6"
        :label="t('overview.listPage.accessOfData')"
        :options="accessTypeOptions"
        :value="currentAccessType"
        @change="currentAccessType = $event"
      />
      <OverviewCardItem
        v-for="(dataset, index) in metaDataDatasets"
        :key="index"
        :dataset="dataset"
        :data-test="`dataset-card-${dataset.id}`"
      />

      <CardDivider />

      <div v-if="isOtherDatasetsLoading" class="animate-pulse">
        {{ t('overview.listPage.loadOtherDatasets') }}
      </div>
      <template v-else>
        <div class="text-2xl">{{ t('overview.listPage.otherDatasets') }}</div>
        <OverviewCardItem
          v-for="(dataset, index) in tourismDatasets"
          :key="index"
          :dataset="dataset"
          :data-test="`dataset-card-${dataset.id}`"
          class="break-words"
        />
      </template>

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

const { t } = useI18n();

const { metaDataDatasets, accessTypeOptions, currentAccessType } =
  useMetaDataDatasets();

const { isOtherDatasetsLoading, tourismDatasets } =
  useOtherDatasets(metaDataDatasets);
</script>
