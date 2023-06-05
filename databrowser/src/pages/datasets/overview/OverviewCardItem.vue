<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CardContainer>
    <CardTitle tag-name="h2" class="text-green-400">
      <routerLink
        :to="datasetOverviewForId(dataset.id).value"
        class="flex items-center gap-3 no-underline"
        :data-test="`dataset-link-${dataset.id}`"
      >
        <DatasetTitle :dataset="dataset" />
        <ArrowLine />
      </routerLink>
      <template #right>
        <div class="flex gap-3 md:justify-self-end">
          <TagCustom size="xs" type="black" text="Tourism" />
          <OverviewTagAccess :dataset="dataset" />
        </div>
      </template>
    </CardTitle>
    <CardText class="mb-4">
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
import OverviewTagAccess from './OverviewTagAccess.vue';
import { usePaths } from '../../../domain/datasets/header/usePaths';

defineProps<{ dataset: TourismMetaData }>();

const { datasetOverviewForId } = usePaths();
</script>
