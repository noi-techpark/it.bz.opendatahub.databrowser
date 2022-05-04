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
        {{ $t('datasets.listView.colDetail') }}
      </TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="renderElements.length === 0">
        <TableCell>{{ $t('datasets.listView.noData') }}</TableCell>
      </tr>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <tr v-for="row in rows">
        <TableCell v-for="col in renderElements" :key="col.title">
          <Cell
            :tag-name="col.component"
            :attributes="getValue(row, col.fields, col.params)"
          />
        </TableCell>
        <TableCell class="sticky right-0 bg-white">
          <div class="flex justify-between max-w-[9rem] h-full">
            <DetailsLink
              :to="{
                name: 'DatasetQuickPage',
                params: {
                  pathParams: [...pathParams, row.Id],
                },
                query: { language: language },
              }"
              :title="$t('datasets.listView.linkQuick')"
            >
              <IconLayer class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="{
                name: 'DatasetTableAndDetailPage',
                params: {
                  pathParams: [...pathParams, row.Id],
                },
                query: { language: language },
              }"
              :title="$t('datasets.listView.linkDetails')"
            >
              <IconEye class="stroke-current" />
            </DetailsLink>
            <DetailsLink
              :to="{
                name: 'DatasetRawPage',
                params: {
                  pathParams: [...pathParams, row.Id],
                },
                query: { language: language },
              }"
              :title="$t('datasets.listView.linkRaw')"
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
import { computed, defineProps, toRefs, withDefaults } from 'vue';
import Cell from '../../../components/listCell/ListCell.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import TableHeaderFilter from '../../../components/table/TableHeaderFilter.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import IconEye from '../../../components/svg/IconEye.vue';
import DetailsLink from './DetailsLink.vue';
import { ListElements } from '../../viewConfig/types';
import { useApiQuery } from '../../api/service/apiQueryHandler';
import { useRoute } from 'vue-router';
import { useFieldExtraction } from '../../api/service/utils';
import IconCode from '../../../components/svg/IconCode.vue';
import IconLayer from '../../../components/svg/IconLayer.vue';

const route = useRoute();
const pathParams = computed(() =>
  Array.isArray(route.params.pathParams)
    ? route.params.pathParams
    : [route.params.pathParams]
);

const props = withDefaults(
  defineProps<{
    rows: any[];
    // config: TableColumnConfig[];
    renderElements: ListElements[];
  }>(),
  {
    rows: () => [],
  }
);

const { rows, renderElements } = toRefs(props);

const { getValue } = useFieldExtraction();
const language = useApiQuery().useApiParameter('language');
</script>
