<template>
  <TableWithStickyHeader>
    <template #colgroup-cols>
      <col v-for="col in config" :key="col.title" :class="col.class" />
      <col class="w-28" />
    </template>

    <template #header-cols>
      <TableHeaderCell v-for="col in config" :key="col.title">
        {{ col.title }}
      </TableHeaderCell>
      <TableHeaderCell class="sticky right-0 bg-white"></TableHeaderCell>
    </template>

    <template #body-rows>
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
            <router-link
              :to="{
                name: 'DatasetsDetailViewPage',
                params: { datasetId: row.Id },
              }"
              class="
                flex
                justify-center
                items-center
                m-1
                w-8
                h-8
                hover:bg-gray-300
                rounded
                border
              "
            >
              <EyeDetailGreen />
            </router-link>
            <router-link
              :to="{
                name: 'DatasetsRawViewPage',
                params: { datasetId: row.Id },
              }"
              class="
                flex
                justify-center
                items-center
                m-1
                w-8
                h-8
                hover:bg-gray-300
                rounded
                border
                text-xs text-green-500
              "
            >
              RAW
            </router-link>
          </div>
        </TableCell>
      </tr>
    </template>
  </TableWithStickyHeader>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TableColumnConfig } from '../../api/config';
import { extractField } from '../../api/configUtils';
import { useUrlQueryRouter } from '../../../lib/urlQuery/urlQueryRouter';
import Cell from '../../../components/listCell/ListCell.vue';
import EyeDetailGreen from '../../../components/svg/EyeDetailGreen.vue';
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import { toRefs } from 'vue';
import { defaultQueryParameters } from './defaultValues';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';

export default defineComponent({
  components: {
    Cell,
    EyeDetailGreen,
    TableHeaderCell,
    TableCell,
    TableWithStickyHeader,
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
    const queryRouter = useUrlQueryRouter({ defaultQueryParameters });
    const { queryParametersWithDefaults } = toRefs(queryRouter);

    const getValue = (
      item: any,
      fields: Record<string, string>,
      params?: Record<string, string>
    ) => ({
      ...extractField(item, fields, queryParametersWithDefaults.value),
      ...params,
    });

    return { getValue };
  },
});
</script>
