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
        <span>{{ dataset.title }}</span>
        <span v-if="dataset.deprecated"> (Deprecated)</span>
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
    <CardIconGrid class="mt-5">
      <IconSource class="mt-0.5" />
      <div class="flex flex-col leading-tight text-gray-600">
        <span class="font-semibold">Sources</span>
        <div class="flex">
          {{ dataset.sources[0] }}
          <TooltipCustom v-if="dataset.sources.length > 0">
            <template #default>
              <button
                v-if="dataset.sources.length > 1"
                class="ml-1 text-green-700"
              >
                +{{ dataset.sources.length - 1 }} others
              </button>
            </template>
            <template #container>
              <span class="text-sm text-dialog">
                {{ dataset.sources.slice(1).join(', ') }}
              </span>
            </template>
          </TooltipCustom>
        </div>
      </div>
    </CardIconGrid>
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
        Access to table view
      </ButtonLink>
      <ButtonRawLink
        target="_blank"
        :href="dataset.externalLink"
        :size="Size.xm2col"
        :variant="Variant.ghost"
        :data-test="`dataset-api-link-${dataset.id}`"
      >
        <IconLink />
        <span class="uppercase">Show dataset API</span>
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
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconSource from '../../../components/svg/IconSource.vue';
import TooltipCustom from '../../../components/tooltip/TooltipCustom.vue';
import CardDivider from '../../../components/card/CardDivider.vue';
import CardActions from '../../../components/card/CardActions.vue';
import IconTable from '../../../components/svg/IconTable.vue';
import ArrowLine from '../../../components/svg/ArrowLine.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

defineProps<{ dataset: TourismMetaData }>();
</script>
