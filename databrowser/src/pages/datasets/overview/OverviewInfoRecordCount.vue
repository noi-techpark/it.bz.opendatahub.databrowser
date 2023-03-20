<template>
  <CardIconGrid>
    <IconNumberOfRecords class="mt-0.5" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">Available records</span>
      <ul v-if="dataset.recordCount">
        <li v-if="dataset.recordCount.open" class="flex justify-between">
          <span>open</span> <span>{{ dataset.recordCount.open }}</span>
        </li>
        <li v-if="dataset.recordCount.reduced" class="flex justify-between">
          <span>reduced</span>
          <span>{{ dataset.recordCount.reduced }}</span>
        </li>
        <li v-if="dataset.recordCount.closed" class="flex justify-between">
          <span>closed</span> <span>{{ dataset.recordCount.closed }}</span>
        </li>
      </ul>
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconNumberOfRecords from '../../../components/svg/IconNumberOfRecords.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
