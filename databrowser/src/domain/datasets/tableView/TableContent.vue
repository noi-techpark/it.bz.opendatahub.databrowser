<template>
  <TableWithStickyHeader>
    <template #colgroup-cols>
      <col v-for="col in config" :key="col.title" :class="col.class" />
      <col class="w-28" />
    </template>

    <template #header-cols>
      <TableHeaderFilter
        v-for="col in config"
        :key="col.title"
        :text="col.title"
        :filter="col.filter"
      />
      <TableHeaderCell class="sticky right-0 bg-white"></TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="rows.length === 0">
        <TableCell>No data</TableCell>
      </tr>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <tr v-for="row in rows">
        <TableCell v-for="col in config" :key="col.title">
          <Cell
            :tag-name="col.component"
            :attributes="getValue(row, col.fields, col.params)"
          />
        </TableCell>
        <TableCell class="sticky right-0 bg-white">
          <div class="flex h-full">
            <DetailsLink
              :to="{
                name: 'DatasetsDetailViewPage',
                params: { datasetId: row.Id },
                query: { language },
              }"
              :title="$t('datasets.listView.linkDetails')"
            >
              <EyeDetailGreen
            /></DetailsLink>
            <DetailsLink
              :to="{
                name: 'DatasetsRawViewPage',
                params: { datasetId: row.Id },
                query: { language },
              }"
              :title="$t('datasets.listView.linkRaw')"
              class="text-xs text-green-500"
            >
              {{ $t('datasets.listView.linkRaw') }}</DetailsLink
            >
          </div>
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import { useApiQuery } from '../../../lib/apiQuery/apiQueryHandler';
import { useFieldExtraction } from '../../api/configUtils';
import Cell from '../../../components/listCell/ListCell.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import TableHeaderFilter from '../../../components/table/TableHeaderFilter.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import EyeDetailGreen from '../../../components/svg/EyeDetailGreen.vue';
import DetailsLink from './DetailsLink.vue';
import { TableColumnConfig } from '../../../../config/types';

const props = withDefaults(
  defineProps<{
    rows: any[];
    config: TableColumnConfig[];
  }>(),
  {
    rows: () => [],
    config: () => [],
  }
);

const { rows, config } = toRefs(props);

const { getValue } = useFieldExtraction();
const language = useApiQuery().useApiParameter('language');
</script>
