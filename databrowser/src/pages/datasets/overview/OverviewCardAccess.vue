<template>
  <CardContainer>
    <CardTitle>Data access</CardTitle>
    <div class="flex flex-wrap gap-5 md:flex-nowrap md:gap-16">
      <div class="flex w-full flex-col md:w-fit">
        <CardText>View in Data Browser</CardText>
        <ButtonLink
          class="mt-2"
          :size="Size.xm2col"
          :to="{
            name: DatasetPage.TABLE,
            params: {
              domain: 'tourism',
              pathParams: dataset.pathParam,
            },
          }"
          :data-test="`dataset-table-link-${dataset.id}`"
        >
          <IconTable />
          Access to table view
        </ButtonLink>
      </div>
      <div class="flex w-full flex-col md:w-fit">
        <CardText>Access data</CardText>
        <ButtonRawLink
          class="mt-2"
          target="_blank"
          :href="dataset.externalLink"
          :size="Size.xm2col"
          :variant="Variant.ghost"
          :data-test="`dataset-api-link-${dataset.id}`"
        >
          <IconLink />
          <span class="uppercase">Show dataset API</span>
        </ButtonRawLink>
      </div>
    </div>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { DatasetPage } from '../../../routes';
import { Size, Variant } from '../../../components/button/types';
import IconLink from '../../../components/svg/IconLink.vue';
import ButtonRawLink from '../../../components/button/ButtonRawLink.vue';
import IconTable from '../../../components/svg/IconTable.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

defineProps<{ dataset: TourismMetaData }>();
</script>
