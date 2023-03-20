import CardIconGrid from '../../../components/card/CardIconGrid.vue';

<template>
  <CardIconGrid>
    <IconSource class="mt-0.5" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">Sources</span>
      <ListWithMore :dataset="dataset" />
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconSource from '../../../components/svg/IconSource.vue';
import ListWithMore from '../../../components/list/ListWithMore.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
