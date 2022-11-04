<template>
  <TableWithStickyHeader>
    <template #colgroup-cols>
      <col v-for="col in renderElements" :key="col.title" :class="col.class" />
      <col class="w-32 md:w-40" />
    </template>

    <template #header-cols>
      <TableHeaderFilter
        v-for="col in renderElements"
        :key="col.title"
        :text="col.title"
        :filter="col.filter"
      />
      <TableHeaderCell class="sticky right-0 font-semibold bg-gray-50">
        {{ t('datasets.listView.colDetail') }}
      </TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="renderElements.length === 0">
        <TableCell>{{ t('datasets.listView.noData') }}</TableCell>
      </tr>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <tr v-for="row in rows">
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
              :to="{
                name: DatasetPage.QUICK,
                params: {
                  id: rowId(row),
                },
                query: { language: language },
              }"
              :title="t('datasets.listView.linkQuick')"
            >
              <IconLayer class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="{
                name: DatasetPage.DETAIL,
                params: {
                  id: rowId(row),
                },
                query: { language: language },
              }"
              :title="t('datasets.listView.linkDetails')"
            >
              <IconEye class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              v-if="showEdit"
              :to="{
                name: DatasetPage.EDIT,
                params: {
                  id: rowId(row),
                },
                query: { language: language },
              }"
              :title="t('datasets.listView.linkEdit')"
            >
              <IconEdit class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="{
                name: DatasetPage.RAW,
                params: {
                  id: rowId(row),
                },
                query: { language: language },
              }"
              :title="t('datasets.listView.linkRaw')"
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
import TableHeaderFilter from '../../../components/table/TableHeaderFilter.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import IconEye from '../../../components/svg/IconEye.vue';
import DetailsLink from './DetailsLink.vue';
import { ListElements } from '../../datasetConfig/types';
import { useApiQuery, usePropertyMapping } from '../../api';
import IconCode from '../../../components/svg/IconCode.vue';
import IconLayer from '../../../components/svg/IconLayer.vue';
import IconEdit from '../../../components/svg/IconEdit.vue';
import { useI18n } from 'vue-i18n';
import { DatasetPage } from '../../../routes';

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
const language = useApiQuery().useApiParameter('language');

const rowId = (row: any) => row.Id ?? row.id;
</script>
