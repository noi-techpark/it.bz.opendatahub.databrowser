<template>
  <div>
    <span class="text-xl font-semibold lg:text-2xl">
      Datasets you may also like
    </span>
    <div class="grid grid-cols-1 gap-4 mt-2 lg:gap-8 lg:mt-4">
      <OverviewCardItem
        v-for="dataset in datasets"
        :key="dataset.title"
        :dataset="dataset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { DatasetDescription } from '../../../config/config-for-pages';
import OverviewCardItem from './OverviewCardItem.vue';

defineProps<{ datasets: DatasetDescription[] }>();
</script>
