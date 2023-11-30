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
        v-for="(row, index) in rows"
        :key="computeRecordId(datasetDomain, row) ?? index"
        :class="{ 'bg-green-400/10': index === selectedRowIndex }"
        @click="rowClicked(index)"
        @dblclick="rowDblClicked(row)"
      >
        <TableCell
          v-for="col in cols"
          :key="col.title"
          :class="{ 'mix-blend-multiply': index === selectedRowIndex }"
        >
          <ComponentRenderer
            :tag-name="col.component"
            :attributes="
              buildTargetFromObjectMapping(row, col.objectMapping, col.params)
            "
            :object-mapping="col.objectMapping"
          />
        </TableCell>
        <TableCell
          v-if="showLinkColumn"
          class="sticky right-0 bg-white shadow-table-static-col"
        >
          <TableLinks
            :row="row"
            :show-edit="showEdit"
            :show-quick="showQuick"
          />
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { computed, onBeforeUpdate, onUpdated, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import TableCell from '../../../components/table/TableCell.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import { buildTargetFromObjectMapping } from '../../api';
import { DatasetDomain, ListElements } from '../../datasetConfig/types';
import SortAndFilterHeader from './SortAndFilterHeader.vue';
import TableDataEmpty from './TableDataEmpty.vue';
import TableLinks from './TableLinks.vue';
import { useTableRowSelection } from './useTableRowSelection';
import { computeRecordId } from '../../data/utils';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    rows: any[];
    cols: ListElements[];
    showDetail: boolean;
    showEdit: boolean;
    showQuick: boolean;
    datasetDomain: DatasetDomain | undefined;
  }>(),
  {
    rows: () => [],
  }
);

const { rows, cols } = toRefs(props);

// Table row selection logic
const { selectedRowIndex, rowClicked, rowDblClicked } =
  useTableRowSelection(rows);

const showLinkColumn = computed(
  () => props.showDetail || props.showEdit || props.showQuick
);

let updateStart = 0;

onBeforeUpdate(() => {
  updateStart = Date.now();
  console.log('----------onBeforeUpdate-------------');
});

onUpdated(() => {
  console.log('----------onUpdate-------------', Date.now() - updateStart);
});
</script>
