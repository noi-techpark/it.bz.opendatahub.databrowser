<template>
  <CardContainer>
    <CardTitle>Data access</CardTitle>
    <div class="flex flex-wrap gap-5 md:flex-nowrap md:gap-16">
      <div class="flex w-full flex-col md:w-fit">
        <CardText>View in Data Browser</CardText>
        <OverviewLinkTable :dataset="dataset" />
      </div>
      <div class="flex w-full flex-col md:w-fit">
        <CardText>Access data</CardText>
        <OverviewLinkApi :dataset="dataset" />
      </div>
    </div>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import OverviewLinkTable from './OverviewLinkTable.vue';
import OverviewLinkApi from './OverviewLinkApi.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
