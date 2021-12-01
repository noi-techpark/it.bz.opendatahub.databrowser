<template>
  <ContentArea>
    <div>
      Dataset Detail Page (type = {{ $route.params.datasetType }}, ID =
      {{ $route.params.datasetId }})
    </div>
    <div v-if="apiResult.isFetching">Loading...</div>
    <div v-else>
      <DataTable>
        <template #tableHeader>
          <TableHeader>Key</TableHeader>
          <TableHeader>Value</TableHeader>
        </template>
        <template #tableBody>
          <TableRow
            v-for="(entry, index) in Object.entries(apiResult.data?.data)"
            :key="index"
          >
            <TableCell>{{ entry[0] }}</TableCell>
            <TableCell class="whitespace-pre-wrap">
              {{ getEntryValue(entry[1]) }}
            </TableCell>
          </TableRow>
        </template>
      </DataTable>
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
import DataTable from '../components/table/Table.vue';
import TableHeader from '../components/table/TableHeader.vue';
import TableRow from '../components/table/TableRow.vue';
import TableCell from '../components/table/TableCell.vue';

export default defineComponent({
  components: { TableCell, TableRow, TableHeader, DataTable, ContentArea },
  setup() {
    const route = useRoute();
    const apiResult = ref<UnwrapRef<GetApiSpecResult<any>>>({} as any);

    const fetchList = async (url: string, id: string) => {
      const result = useGetApiSpec<any>(url.replace('{id}', id));
      apiResult.value = result as unknown as UnwrapRef<GetApiSpecResult<any>>;
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
      configEntry,
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
