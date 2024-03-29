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
          <TagCustom
            class="capitalize"
            size="xs"
            type="black"
            :text="dataset.dataSpace ?? t('overview.info.dataSpace.unknown')"
          />
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
import { useI18n } from 'vue-i18n';
import CardActions from '../../../components/card/CardActions.vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import CardText from '../../../components/card/CardText.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import ArrowLine from '../../../components/svg/ArrowLine.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import DatasetTitle from '../../../domain/datasets/ui/common/DatasetTitle.vue';
import { usePaths } from '../../../domain/datasets/ui/header/usePaths';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import OverviewInfoSources from './OverviewInfoSources.vue';
import OverviewLinkApi from './OverviewLinkApi.vue';
import OverviewLinkTable from './OverviewLinkTable.vue';
import OverviewTagAccess from './OverviewTagAccess.vue';

defineProps<{ dataset: TourismMetaData }>();

const { t } = useI18n();

const { datasetOverviewForId } = usePaths();
</script>
