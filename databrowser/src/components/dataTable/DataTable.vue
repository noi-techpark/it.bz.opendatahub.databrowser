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
      <tr v-for="row in rows" class="align-top">
        <td v-for="col in config" :key="col.title" class="bg-yellow-100">
          <Cell
            :tag-name="col.component"
            :attributes="getValue(row, col.fields)"
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
    rows: {
      required: false,
      default: () => [],
      type: [Array] as PropType<any[]>,
    },
    config: {
      required: false,
      default: () => [],
      type: Array as PropType<TableColumnConfig[]>,
    },
  },
  methods: {
    getValue(item: any, fields: Record<string, string>) {
      return extractField(item, fields);
    },
  },
});
</script>
