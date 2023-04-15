<template>
  <TableWithStickyHeader id="dataset-table">
    <template #colgroup-cols>
      <col v-for="col in renderElements" :key="col.title" :class="col.class" />
      <col class="w-32 md:w-40" />
    </template>

    <template #header-cols>
      <TableHeaderSort
        v-for="col in renderElements"
        :key="col.title"
        :text="col.title"
        :fields="col.fields"
      />
      <TableHeaderCell class="sticky right-0 bg-gray-50 font-semibold">
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
      <tr v-for="(row, index) in rows" :key="row.Id ?? row.id ?? index">
        <TableCell v-for="col in renderElements" :key="col.title">
          <ComponentRenderer
            :tag-name="col.component"
            :attributes="mapWithIndex(row, col.fields, col.params)"
            :fields="col.fields"
          />
        </TableCell>
        <TableCell class="sticky right-0 bg-white shadow-table-static-col">
          <div
            class="grid gap-2"
            :class="showEdit ? 'grid-cols-2 w-24' : 'grid-cols-3'"
          >
            <DetailsLink
              v-if="showQuick"
              :to="quickViewPathForId(rowId(row)).value"
              :title="t('datasets.listView.linkQuick')"
              data-test="dataset-quick-link"
            >
              <IconLayer class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="detailViewPathForId(rowId(row)).value"
              :title="t('datasets.listView.linkDetails')"
              data-test="dataset-detail-link"
            >
              <IconEye class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              v-if="showEdit"
              :to="editViewPathForId(rowId(row)).value"
              :title="t('datasets.listView.linkEdit')"
              data-test="dataset-edit-link"
            >
              <IconEdit class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="rawViewPathForId(rowId(row)).value"
              :title="t('datasets.listView.linkRaw')"
              data-test="dataset-raw-link"
            >
              <IconCode class="stroke-current" />
            </DetailsLink>
          </div>
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import TableHeaderSort from '../../../components/table/TableHeaderSort.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import IconEye from '../../../components/svg/IconEye.vue';
import DetailsLink from './DetailsLink.vue';
import { ListElements } from '../../datasetConfig/types';
import { usePropertyMapping } from '../../api';
import IconCode from '../../../components/svg/IconCode.vue';
import IconLayer from '../../../components/svg/IconLayer.vue';
import IconEdit from '../../../components/svg/IconEdit.vue';
import { useI18n } from 'vue-i18n';
import { usePathsForCurrentRoute } from '../header/usePaths';
import TableDataEmpty from './TableDataEmpty.vue';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    rows: any[];
    renderElements: ListElements[];
    showEdit: boolean;
    showQuick: boolean;
  }>(),
  {
    rows: () => [],
  }
);

const { rows, renderElements } = toRefs(props);

const { mapWithIndex } = usePropertyMapping();

const rowId = (row: any) => row.Id ?? row.id;

const {
  detailViewPathForId,
  quickViewPathForId,
  rawViewPathForId,
  editViewPathForId,
} = usePathsForCurrentRoute();
</script>
