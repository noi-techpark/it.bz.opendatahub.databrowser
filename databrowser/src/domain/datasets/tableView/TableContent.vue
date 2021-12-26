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
            <LinkDetail :id="row.Id"></LinkDetail>
            <LinkRaw :id="row.Id"></LinkRaw>
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
import TableHeaderCell from '../../../components/table/TableHeaderCell.vue';
import TableCell from '../../../components/table/TableCell.vue';
import { toRefs } from 'vue';
import { defaultQueryParameters } from './defaultValues';
import TableWithStickyHeader from '../../../components/table/TableWithStickyHeader.vue';
import LinkDetail from './LinkDetail.vue';
import LinkRaw from './LinkRaw.vue';

export default defineComponent({
  components: {
    Cell,
    TableHeaderCell,
    TableCell,
    TableWithStickyHeader,
    LinkDetail,
    LinkRaw,
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
