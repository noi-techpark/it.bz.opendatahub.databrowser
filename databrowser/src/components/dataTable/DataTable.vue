<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in config" :key="col.title">
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <tr v-for="item in getRows(data)" class="align-top">
        <td v-for="col in config" :key="col.title" class="bg-yellow-100">
          <Cell
            :tag-name="col.component"
            :attributes="getValue(item, col.fields)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { TableColumnConfig } from '../../domain/api/config';
import { extractField } from '../../domain/api/configUtils';
import Cell from '../cell/Cell.vue';

export default defineComponent({
  components: { Cell },
  props: {
    data: {
      required: false,
      default: () => [],
      type: [Object, Array] as PropType<{ Items: any[] } | any[]>,
    },
    config: {
      required: false,
      default: () => [],
      type: Array as PropType<TableColumnConfig[]>,
    },
  },
  methods: {
    getRows(data: any[] | Record<string, any> | undefined): any[] {
      return Array.isArray(data) ? data : data?.Items;
    },
    getValue(item: any, fields: Record<string, string>) {
      return extractField(item, fields);
    },
  },
});
</script>
