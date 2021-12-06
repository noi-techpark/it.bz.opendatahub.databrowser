<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in config" :key="col.title">
          {{ col.title }}
        </th>
        <th class="sticky right-0 bg-white"></th>
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
        <td class="sticky right-0 p-4 bg-white">
          <div class="flex -m-px h-full">
            <router-link
              :to="{ name: 'datasetDetailPage', params: { datasetId: row.Id } }"
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
              :to="{ name: 'datasetRawPage', params: { datasetId: row.Id } }"
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
import EyeDetailGreen from '../svg/EyeDetailGreen.vue';

export default defineComponent({
  components: { Cell, EyeDetailGreen },
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
