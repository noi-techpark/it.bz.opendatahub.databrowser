<template>
  <section v-if="apiResult.isSuccess" class="flex flex-col">
    <div class="lg:flex flex-wrap lg:gap-5">
      <div v-if="categories.length > 0" class="flex flex-col lg:w-1/6">
        <DetailCategories
          :categories="categories"
          :current-slug="currentSlug"
        />
      </div>

      <div
        v-if="currentSlug !== ''"
        class="subcategory-container"
        :style="{
          'column-count': Math.min(currentSubcategories?.length ?? 1, 3),
        }"
      >
        <DetailSubCategories
          :data="apiResult.data.data"
          :sub-categories="currentSubcategories"
        />
      </div>
    </div>

    <DownloadSection
      :dataset="apiResult.data?.data"
      :dataset-url="datasetUrl"
      hide-csv
    />
  </section>
</template>

<script setup lang="ts">
import { AxiosInstance } from 'axios';
import { computed, ComputedRef, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApi } from '../../api/client';
import { getApiConfigForDataset } from '../../api/configUtils';
import { useHashSlug } from './useHashSlug';
import DetailCategories, { DetailCategory } from './DetailCategories.vue';
import DetailSubCategories from './DetailSubCategories.vue';
import { getDatasetUrl } from '../queryDataset';
import DownloadSection from '../../../components/download/DownloadSection.vue';

const route = useRoute();
const datasetType = route.params.datasetType as string;
const datasetId = route.params.datasetId as string;
const datasetUrl = getDatasetUrl(datasetType, datasetId);

// Get config parameters
const { viewConfig } =
  getApiConfigForDataset(datasetType)?.detailEndpoint ?? {};

const apiResult = ref({} as any);

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
      ?.subcategories ?? []
);

const categories: ComputedRef<DetailCategory[]> = computed(
  () =>
    viewConfig?.map((vc) => {
      return {
        name: vc.name,
        slug: vc.slug,
        to: { hash: `#${vc.slug}`, query: route.query },
      };
    }) ?? []
);
</script>

<style>
.subcategory-container {
  @apply flex-1;
  column-width: 250px;
}
</style>
