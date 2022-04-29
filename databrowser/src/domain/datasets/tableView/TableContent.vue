<template>
  <TableWithStickyHeader>
    <template #colgroup-cols>
      <col v-for="col in renderElements" :key="col.title" :class="col.class" />
      <col class="w-28" />
    </template>

    <template #header-cols>
      <TableHeaderFilter
        v-for="col in renderElements"
        :key="col.title"
        :text="col.title"
        :filter="col.filter"
      />
      <TableHeaderCell class="sticky right-0 bg-white"></TableHeaderCell>
    </template>

    <template #body-rows>
      <tr v-if="renderElements.length === 0">
        <TableCell>No data</TableCell>
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
          <div class="flex h-full">
            <div>
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
                <EyeDetailGreen
              /></DetailsLink>
              <DetailsLink
                :to="{
                  name: 'DatasetRawPage',
                  params: {
                    pathParams: [...pathParams, row.Id],
                  },
                  query: { language: language },
                }"
                :title="$t('datasets.listView.linkRaw')"
                class="text-xs text-green-500"
              >
                {{ $t('datasets.listView.linkRaw') }}</DetailsLink
              >
            </div>
          </div>
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs, withDefaults } from 'vue';
import { useFieldExtraction } from '../../viewConfig';
import Cell from '../../../components/listCell/ListCell.vue';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import TableHeaderFilter from '../../../components/table/TableHeaderFilter.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import EyeDetailGreen from '../../../components/svg/EyeDetailGreen.vue';
import DetailsLink from './DetailsLink.vue';
import { ListElements } from '../../viewConfig/types';
import { useApiQuery } from '../../api/service/apiQueryHandler';
import { useRoute } from 'vue-router';

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
