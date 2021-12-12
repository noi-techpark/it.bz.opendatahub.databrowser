<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div class="data-table-wrapper">
    <table class="data-table">
      <colgroup>
        <col v-for="col in config" :key="col.title" :class="col.class" />
        <col class="w-28" />
      </colgroup>
      <TableHeader class="sticky top-0 z-10">
        <TableHeaderCell v-for="col in config" :key="col.title">
          {{ col.title }}
        </TableHeaderCell>
        <TableHeaderCell class="sticky right-0 bg-white"></TableHeaderCell>
      </TableHeader>
      <TableBody>
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
                  name: 'datasetDetailPage',
                  params: { datasetId: row.Id },
                }"
                class="dataset-link"
              >
                <EyeDetailGreen />
              </router-link>
              <router-link
                :to="{
                  name: 'datasetRawPage',
                  params: { datasetId: row.Id },
                }"
                class="text-xs text-green-500 dataset-link"
              >
                RAW
              </router-link>
            </div>
          </TableCell>
        </tr>
      </TableBody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TableColumnConfig } from '../../domain/api/config';
import { extractField } from '../../domain/api/configUtils';
import { useUrlQueryRouter } from '../../lib/urlQuery/urlQueryRouter';
import Cell from '../listCell/ListCell.vue';
import EyeDetailGreen from '../svg/EyeDetailGreen.vue';
import TableBody from '../table/TableBody.vue';
import TableHeader from '../table/TableHeader.vue';
import TableHeaderCell from '../table/TableHeaderCell.vue';
import TableCell from '../table/TableCell.vue';
import { toRefs } from 'vue';
import { defaultQueryParameters } from '../../pages/datasets/defaultValues';

export default defineComponent({
  components: {
    Cell,
    EyeDetailGreen,
    TableBody,
    TableHeader,
    TableHeaderCell,
    TableCell,
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

<style>
.data-table-wrapper {
  @apply overflow-auto my-6 rounded-xl rounded-tr-none border-r border-b border-l;
}
/* original solution: https://stackoverflow.com/a/68166503 */
.data-table {
  @apply w-full border-separate table-fixed;
  border-spacing: 0;
}
.data-table thead th:nth-last-child(2)::before,
.data-table thead th:first-child::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: theme('spacing.3');
  background-image: linear-gradient(
      to bottom,
      transparent theme('spacing.3'),
      theme('colors.gray.200') 0
    ),
    radial-gradient(
      circle at theme('spacing.3') theme('spacing.3'),
      theme('colors.gray.200') theme('spacing.3'),
      theme('colors.white') 0
    );
  background-position: top left;
  background-size: theme('spacing.6') 100%,
    theme('spacing.6') theme('spacing.6');
  background-repeat: no-repeat;
}
.data-table thead th:nth-last-child(2) {
  @apply relative;
}
.data-table thead th:nth-last-child(2)::before {
  @apply left-auto right-0 bg-right-top;
}
.data-table tbody tr {
  @apply align-top;
}
.data-table tbody tr:not(:first-child) td {
  @apply border-t;
}
.data-table tbody td:last-child {
  @apply border-l;
}

.dataset-link {
  @apply flex justify-center items-center m-1 w-8 h-8 hover:bg-gray-300 rounded border;
}
</style>
