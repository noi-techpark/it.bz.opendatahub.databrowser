<template>
  <div>
    <span class="text-xl font-semibold lg:text-2xl">
      {{ t('overview.cardSuggestion.otherDatasets') }}
    </span>
    <div class="mt-2 grid grid-cols-1 gap-4 lg:mt-4 lg:gap-8">
      <OverviewCardItem
        v-for="(dataset, index) in datasets"
        :key="index"
        :dataset="dataset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import OverviewCardItem from './OverviewCardItem.vue';

const { t } = useI18n();

defineProps<{ datasets: TourismMetaData[] }>();
</script>
