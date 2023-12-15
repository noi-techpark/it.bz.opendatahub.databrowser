<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TableWithStickyHeader id="dataset-table">
    <template #colgroup-cols>
      <col v-for="col in renderElements" :key="col.title" :class="col.class" />
      <col class="w-28 md:w-32" />
    </template>

    <template #header-cols>
      <TableHeaderCell v-for="(col, index) in renderElements" :key="col.title">
        <SortAndFilterHeader
          :title="columns[index]?.title ?? 'index mismatch'"
          :field="columns[index]?.field"
        />
      </TableHeaderCell>
      <TableHeaderCell class="sticky right-0 bg-gray-50">
        {{ t('datasets.listView.colDetail') }}
      </TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="rows.length === 0">
        <TableCell
          :colspan="renderElements.length + 1"
          class="border-none"
          data-test="dataset-table-no-results"
        >
          <TableDataEmpty />
        </TableCell>
      </tr>
      <tr
        v-for="(row, index) in rows"
        :key="rowId(row, index.toString())"
        :class="{ 'bg-green-400/10': index === selectedRowIndex }"
        @click="rowClicked(index)"
        @dblclick="rowDblClicked(row)"
      >
        <TableCell
          v-for="col in renderElements"
          :key="col.title"
          :class="{ 'mix-blend-multiply': index === selectedRowIndex }"
        >
          <ComponentRenderer
            :tag-name="col.component"
            :attributes="mapWithIndex(row, col.fields, col.params)"
            :fields="col.fields"
          />
        </TableCell>
        <TableCell class="sticky right-0 bg-white shadow-table-static-col">
          <TableLinks
            :row="row"
            :show-edit="showEdit"
            :show-delete="showDelete"
            :show-quick="showQuick"
          />
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import { ListElements } from '../../datasetConfig/types';
import { usePropertyMapping } from '../../api';
import { useI18n } from 'vue-i18n';
import TableDataEmpty from './TableDataEmpty.vue';
import SortAndFilterHeader from './SortAndFilterHeader.vue';
import { useTableViewColumns } from '../../datasetConfig/utils';
import { useTableRowSelection } from './useTableRowSelection';
import { rowId } from './utils';
import TableLinks from './TableLinks.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    rows: any[];
    renderElements: ListElements[];
    showEdit: boolean;
    showDelete: boolean;
    showQuick: boolean;
  }>(),
  {
    rows: () => [],
  }
);

const { rows, renderElements } = toRefs(props);

const { mapWithIndex } = usePropertyMapping();

// Table row selection logic
const { selectedRowIndex, rowClicked, rowDblClicked } =
  useTableRowSelection(rows);

// TODO: temporary solution until we have a better way to handle this
const columns = useTableViewColumns();
</script>
