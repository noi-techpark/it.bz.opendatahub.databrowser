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
      <ButtonLink
        :size="Size.xm2col"
        :to="{
          name: DatasetPage.TABLE,
          params: {
            domain: 'tourism',
            pathParams: dataset.pathParam,
          },
          query: dataset.apiFilter,
        }"
        :data-test="`dataset-table-link-${dataset.id}`"
      >
        <IconTable />
        {{ t('overview.cardItem.accessTableView') }}
      </ButtonLink>
      <ButtonRawLink
        target="_blank"
        :href="dataset.externalLink"
        :size="Size.xm2col"
        :variant="Variant.ghost"
        :data-test="`dataset-api-link-${dataset.id}`"
      >
        <IconLink />
        <span class="uppercase">
          {{ t('overview.cardItem.showDatasetApi') }}
        </span>
      </ButtonRawLink>
    </CardActions>
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
import TagCustom from '../../../components/tag/TagCustom.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import CardActions from '../../../components/card/CardActions.vue';
import IconTable from '../../../components/svg/IconTable.vue';
import ArrowLine from '../../../components/svg/ArrowLine.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import DatasetTitle from '../../../domain/datasets/common/DatasetTitle.vue';
import { useI18n } from 'vue-i18n';
import OverviewInfoSources from './OverviewInfoSources.vue';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
