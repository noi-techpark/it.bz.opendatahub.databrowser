<template>
  <CardContainer>
    <CardTitle tag-name="h2" class="text-green-400">
      <routerLink
        :to="{
          name: 'OverviewDetailPage',
          params: { id: dataset.id },
        }"
        class="flex items-center gap-3 no-underline"
        :data-test="`dataset-link-${dataset.id}`"
      >
        <DatasetTitle
          :name="dataset.shortname"
          :parent="dataset.apiIdentifier"
        />
        <ArrowLine />
      </routerLink>
      <template #right>
        <div class="flex gap-3 md:justify-self-end">
          <TagCustom size="xs" type="black" text="Tourism" />
          <TagCustom
            v-if="dataset.access === 'opendata'"
            size="xs"
            type="blue"
            text="Full access"
            has-dot
          />
          <TagCustom
            v-if="dataset.access === 'limited' || dataset.access === 'closed'"
            size="xs"
            type="yellow"
            text="Limited access"
            has-dot
          />
        </div>
      </template>
    </CardTitle>
    <CardText>
      {{ dataset.description }}
    </CardText>
    <OverviewInfoSources :dataset="dataset" />
    <CardDivider />
    <CardActions>
      <OverviewLinkTable :dataset="dataset" />
      <OverviewLinkApi :dataset="dataset" />
    </CardActions>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import CardActions from '../../../components/card/CardActions.vue';
import ArrowLine from '../../../components/svg/ArrowLine.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import DatasetTitle from '../../../domain/datasets/common/DatasetTitle.vue';
import OverviewInfoSources from './OverviewInfoSources.vue';
import OverviewLinkTable from './OverviewLinkTable.vue';
import OverviewLinkApi from './OverviewLinkApi.vue';

defineProps<{ dataset: TourismMetaData }>();
</script>
