<template>
  <ContentArea>
    <div>
      Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
      {{ $route.params.datasetId }})
    </div>
    <div>
      <TableCustom>
        <template #tableHeader>
          <TableHeaderCell>Key</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
        </template>
        <template #tableBody>
          <TableLoadingRow v-if="apiResult.isFetching" />
          <tr
            v-for="(entry, index) in Object.entries(apiResult.data?.data)"
            v-else
            :key="index"
          >
            <TableCell>{{ entry[0] }}</TableCell>
            <TableCell class="whitespace-pre-wrap">
              {{ getEntryValue(entry[1]) }}
            </TableCell>
          </tr>
        </template>
      </TableCustom>
    </div>
  </ContentArea>
</template>

<script lang="ts">
import { ref, UnwrapRef } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { GetApiSpecResult, useGetApiSpec } from '../domain/api/client';
import { useRoute } from 'vue-router';
import { apiConfigProvider } from '../domain/api/configUtils';
import ContentArea from '../components/content/ContentArea.vue';
import TableCustom from '../components/table/TableCustom.vue';
import TableHeaderCell from '../components/table/TableHeaderCell.vue';
import TableCell from '../components/table/TableCell.vue';
import TableLoadingRow from '../components/table/TableLoadingRow.vue';

export default defineComponent({
  components: {
    TableLoadingRow,
    TableCell,
    TableHeaderCell,
    TableCustom,
    ContentArea,
  },
  setup() {
    const route = useRoute();
    const apiResult = ref<UnwrapRef<GetApiSpecResult<unknown>>>({} as any);

    const fetchList = async (url: string, id: string) => {
      const result = useGetApiSpec<any>(url.replace('{id}', id));
      apiResult.value = result as unknown as UnwrapRef<
        GetApiSpecResult<unknown>
      >;
    };

    const configEntry = apiConfigProvider(route.params.datasetType as string);
    if (configEntry != null) {
      fetchList(
        configEntry.detailEndpoint.path,
        route.params.datasetId as string
      );
    }
    return {
      apiResult,
      fetchList,
    };
  },
  methods: {
    getEntryValue(entry: unknown) {
      return typeof entry == 'object' ? JSON.stringify(entry, null, 4) : entry;
    },
  },
});
</script>
