<template>
  <div>
    <span class="text-xl font-semibold lg:text-2xl">
      Datasets you may also like
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
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import OverviewCardItem from './OverviewCardItem.vue';

defineProps<{ datasets: TourismMetaData[] }>();
</script>
