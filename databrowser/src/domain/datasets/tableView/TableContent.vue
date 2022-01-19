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
        :has-filter="col.filter != null"
        :text="col.title"
      >
        <Cell
          v-if="col.filter != null"
          :tag-name="col.filter.component"
          :attributes="col.filter.fields"
        />
      </TableHeaderFilter>
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
        <TableCell class="sticky right-0 z-10 bg-white">
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

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TableColumnConfig } from '../../api/config';
import { useFieldExtraction } from '../../api/configUtils';
import Cell from '../../../components/listCell/ListCell.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import EyeDetailGreen from '../../../components/svg/EyeDetailGreen.vue';
import DetailsLink from './DetailsLink.vue';
import TableHeaderFilter from '../../../components/table/TableHeaderFilter.vue';
import { useApiQuery } from '../../../lib/apiQuery/apiQueryHandler';

export default defineComponent({
  components: {
    Cell,
    TableHeaderCell,
    TableCell,
    TableWithStickyHeader,
    EyeDetailGreen,
    DetailsLink,
    TableHeaderFilter,
  },
  props: {
    rows: {
      default: () => [],
      type: [Array] as PropType<any[]>,
    },
    config: {
      default: () => [],
      type: Array as PropType<TableColumnConfig[]>,
    },
  },
  setup() {
    const { getValue } = useFieldExtraction();
    const language = useApiQuery().useApiParameter('language');
    return { getValue, language };
  },
});
</script>
