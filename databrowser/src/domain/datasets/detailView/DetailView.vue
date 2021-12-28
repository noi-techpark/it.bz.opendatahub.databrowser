<template>
  Dataset Detail Page (type = {{ datasetType }}, ID = {{ datasetId }}, URL =
  {{ url }})
  <section v-if="apiResult.isSuccess" class="flex flex-col">
    <div class="flex flex-wrap">
      <div class="flex flex-col mr-5 w-1/6">
        <PillButton
          v-for="category in viewConfig"
          :key="category.name"
          :variant="PillVariant.edged"
          :active="currentCategoryName === category.name"
          class="my-1"
          @click="currentCategoryName = category.name"
        >
          {{ category.name }}
        </PillButton>
      </div>

      <div
        v-if="currentCategoryName !== ''"
        class="flex flex-wrap flex-1 bg-red-100"
      >
        <div
          v-for="subcategory in currentSubcategories"
          :key="subcategory.name"
          class="flex flex-col p-2 w-1/3 bg-green-100"
        >
          <div class="text-xl">{{ subcategory.name }}</div>
          <div v-for="property in subcategory.properties" :key="property.title">
            <div class="text-gray-500">{{ property.title }}</div>

            <ListCell
              :tag-name="property.component"
              :attributes="
                getValue(apiResult.data.data, property.fields, property.params)
              "
            />
          </div>
        </div>
      </div>
    </div>

    <pre v-if="true">{{ JSON.stringify(apiResult.data, null, 2) }}</pre>
  </section>
</template>

<script setup lang="ts">
import { AxiosInstance, AxiosResponse } from 'axios';
import { computed, inject, ref, toRefs, UnwrapRef } from 'vue';
import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import { useRoute } from 'vue-router';
import { useApi } from '../../api/client';
import { extractField, getApiConfigForDataset } from '../../api/configUtils';
import ListCell from '../../../components/listCell/ListCell.vue';
import { useUrlQueryRouter } from '../../../lib/urlQuery/urlQueryRouter';
import { defaultQueryParameters } from '../tableView/defaultValues';
import PillButton from '../../../components/pill/PillButton.vue';
import { PillVariant } from '../../../components/pill/types';

const route = useRoute();
const datasetType = route.params.datasetType as string;
const datasetId = route.params.datasetId as string;

// Get config parameters
const { url, viewConfig } =
  getApiConfigForDataset(datasetType)?.detailEndpoint ?? {};

const datasetUrl = url != null ? url.replace('{id}', datasetId) : null;

const apiResult = ref<
  UnwrapRef<UseQueryReturnType<AxiosResponse<any, any>, Error>>
>({} as any);

if (datasetUrl != null) {
  const axios = inject<AxiosInstance>('axios');

  if (axios != null) {
    const fetcher = async ({ queryKey }: { queryKey: unknown[] }) => {
      return await axios.get(queryKey[0] as string);
    };
    const result = useApi(datasetUrl, fetcher as unknown as any);
    apiResult.value = result as any;
  }
}

const initialCategoryName = viewConfig?.[0].name ?? '';
const currentCategoryName = ref(initialCategoryName);
const currentSubcategories = computed(
  () =>
    viewConfig?.find((config) => config.name === currentCategoryName.value)
      ?.subcategories
);

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
</script>

<style></style>
