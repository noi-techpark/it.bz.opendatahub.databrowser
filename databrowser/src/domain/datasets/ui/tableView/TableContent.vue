<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TableWithStickyHeader id="dataset-table">
    <template #colgroup-cols>
      <col v-for="col in cols" :key="col.title" :class="col.class" />
      <col v-if="showLinkColumn" class="w-28 md:w-32" />
    </template>

    <template #header-cols>
      <TableHeaderCell v-for="col in cols" :key="col.title">
        <SortAndFilterHeader
          :title="col.title"
          :property-path="col.propertyPath"
        />
      </TableHeaderCell>
      <TableHeaderCell v-if="showLinkColumn" class="sticky right-0 bg-gray-50">
        {{ t('datasets.listView.colDetail') }}
      </TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="rows.length === 0">
        <TableCell
          :colspan="cols.length + 1"
          class="border-none"
          data-test="dataset-table-no-results"
        >
          <TableDataEmpty />
        </TableCell>
      </tr>
      <tr
        v-for="({ recordId, values }, rowIndex) in rows"
        :key="recordId ?? rowIndex"
        :class="{ 'bg-green-400/10': rowIndex === selectedRowIndex }"
        @click="rowClicked(rowIndex)"
        @dblclick="rowDblClicked(recordId)"
      >
        <TableCell
          v-for="(col, colIndex) in cols"
          :key="col.title"
          :class="{ 'mix-blend-multiply': rowIndex === selectedRowIndex }"
        >
          <ComponentRenderer
            :tag-name="col.component"
            :attributes="values[colIndex]"
            :object-mapping="col.objectMapping"
          />
        </TableCell>
        <TableCell
          v-if="showLinkColumn"
          class="sticky right-0 bg-white shadow-table-static-col"
        >
          <TableLinks
            :record-id="recordId"
            :show-edit="showEdit"
            :show-quick="showQuick"
          />
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import ComponentRenderer from '../../../../components/componentRenderer/ComponentRenderer.vue';
import TableCell from '../../../../components/table/TableCell.vue';
import TableHeaderCell from '../../../../components/table/TableHeaderCell.vue';
import TableWithStickyHeader from '../../../../components/table/TableWithStickyHeader.vue';
import { DatasetDomain, ListElements } from '../../../datasets/config/types';
import SortAndFilterHeader from './SortAndFilterHeader.vue';
import TableDataEmpty from './TableDataEmpty.vue';
import TableLinks from './TableLinks.vue';
import { RecordValues } from './load/types';
import { useTableRowSelection } from './useTableRowSelection';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    rows: RecordValues[];
    cols: ListElements[];
    showDetail: boolean;
    showEdit: boolean;
    showQuick: boolean;
    datasetDomain: DatasetDomain | undefined;
  }>(),
  {}
);

const { rows, cols } = toRefs(props);

// Table row selection logic
const { selectedRowIndex, rowClicked, rowDblClicked } =
  useTableRowSelection(rows);

const showLinkColumn = computed(
  () => props.showDetail || props.showEdit || props.showQuick
);
</script>
