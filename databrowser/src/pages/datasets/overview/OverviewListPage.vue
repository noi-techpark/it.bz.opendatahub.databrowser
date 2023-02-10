<template>
  <AppLayout>
    <HeroContainer>
      <HeroTitle>List of all datasets</HeroTitle>
      <router-link
        to="/links"
        class="text-green-500"
        data-test="all-endpoints-link"
      >
        Show all available Endpoints
      </router-link>
    </HeroContainer>

    <PageGridContent>
      <SelectWithLabel
        id="access-of-data"
        class="md:w-1/6"
        label="Access of data"
        :options="accessTypeOptions"
        :value="currentAccessType"
        @change="currentAccessType = $event"
      />
      <OverviewCardItem
        v-for="(dataset, index) in results"
        :key="index"
        :dataset="dataset"
        :data-test="`dataset-card-${dataset.id}`"
      />

      <CardDivider />

      <PartnersAndContributors />
    </PageGridContent>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../../../layouts/AppLayout.vue';
import HeroContainer from '../../../components/hero/HeroContainer.vue';
import HeroTitle from '../../../components/hero/HeroTitle.vue';
import { computed, ref } from 'vue';
import { SelectOption } from '../../../components/select/types';
import SelectWithLabel from '../../../components/select/SelectWithLabel.vue';
import OverviewCardItem from './OverviewCardItem.vue';
import PartnersAndContributors from '../../../components/partners/PartnersAndContributors.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import PageGridContent from '../../../components/content/PageGridContent.vue';
import { useMetaData } from '../../../domain/metaDataConfig/tourism/useMetaData';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

const metaData = useMetaData();
const results = computed<TourismMetaData[]>(() => {
  const datasets = metaData.data?.value ?? [];
  if (currentAccessType.value === 'opendata') {
    return datasets.filter((dataset) => dataset.access === 'opendata');
  } else if (currentAccessType.value === 'limited') {
    return datasets.filter(
      (dataset) => dataset.access === 'limited' || dataset.access === 'closed'
    );
  }
  return datasets;
});

const currentAccessType = ref('all');

const accessTypeOptions = computed<SelectOption[]>(() => [
  {
    label: 'All access types',
    value: 'all',
  },
  {
    label: 'Full access',
    value: 'opendata',
  },
  {
    label: 'Limited access',
    value: 'limited',
  },
]);
</script>
