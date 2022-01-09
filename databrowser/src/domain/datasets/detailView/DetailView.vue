<template>
  <section v-if="apiResult.isSuccess" class="flex flex-col">
    <div class="lg:flex flex-wrap lg:gap-5">
      <div class="flex flex-col lg:w-1/6">
        <PillLink
          v-for="category in viewConfig"
          :key="category.slug"
          :to="{ hash: `#${category.slug}` }"
          :variant="PillVariant.edged"
          :active="currentSlug === category.slug"
          class="my-1"
        >
          {{ category.name }}
        </PillLink>
      </div>

      <div
        v-if="currentSlug !== ''"
        class="subcategory-container"
        :style="{
          'column-count': Math.min(currentSubcategories?.length ?? 1, 3),
        }"
      >
        <div
          v-for="subcategory in currentSubcategories"
          :key="subcategory.name"
        >
          <div class="inline-block w-full">
            <div class="p-4 font-bold bg-gray-200">
              {{ subcategory.name }}
            </div>
            <div class="flex flex-col gap-2 my-3">
              <div
                v-for="property in subcategory.properties"
                :key="property.title"
              >
                <div class="text-sm text-gray-500">{{ property.title }}</div>

                <ListCell
                  :tag-name="property.component"
                  :attributes="
                    getValue(
                      apiResult.data.data,
                      property.fields,
                      property.params
                    )
                  "
                  :class="property.class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { PillVariant } from '../../../components/pill/types';
import PillLink from '../../../components/pill/PillLink.vue';
import { useUrlQueryRouter } from '../../../lib/urlQuery/urlQueryRouter';
import { defaultQueryParameters } from '../tableView/defaultValues';
import { useHashSlug } from './useHashSlug';

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

const initialSlug = viewConfig?.[0].slug ?? '';
const validSlugs = viewConfig?.map((vc) => vc.slug) ?? [];
const { currentSlug } = useHashSlug(initialSlug, new Set(validSlugs));
const currentSubcategories = computed(
  () =>
    viewConfig?.find((config) => config.slug === currentSlug.value)
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

<style>
.subcategory-container {
  @apply flex-1;
  column-width: 250px;
}
</style>
