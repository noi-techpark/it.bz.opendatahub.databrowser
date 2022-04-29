<template>
  <ContentAlignmentX>
    <section v-if="isError === true" class="bg-red-200">
      <h2>Got error from API</h2>
      <div>{{ error }}</div>
    </section>
    <div>
      <router-link
        :to="{
          path: './79C93A2154142D4D35EE2C3B59543476_REDUCED',
          hash: $route.hash,
        }"
        >79C93A2154142D4D35EE2C3B59543476_REDUCED</router-link
      >|
      <router-link
        :to="{
          path: './5CEA544EE34639034F07B79D4AEEB603_REDUCED',
          hash: $route.hash,
        }"
        >5CEA544EE34639034F07B79D4AEEB603_REDUCED</router-link
      >
    </div>
    <section v-if="isSuccess === true" class="flex flex-col">
      <div class="lg:flex flex-wrap lg:gap-5">
        <div v-if="categories.length > 0" class="flex flex-col lg:w-1/6">
          <DetailCategories :categories="categories" :current-slug="slug" />
        </div>

        <div
          v-if="slug !== ''"
          :style="{
            'column-count': Math.min(subcategories?.length ?? 1, 3),
          }"
          class="subcategory-container"
        >
          <DetailSubCategories :data="data" :sub-categories="subcategories" />
        </div>
      </div>

      <DownloadSection :dataset="data" :dataset-url="url" hide-csv />
    </section>
  </ContentAlignmentX>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import { useApiForViewConfig } from '../../api/client/client';
import DetailCategories from './DetailCategories.vue';
import DetailSubCategories from './DetailSubCategories.vue';
import DownloadSection from '../../../components/download/DownloadSection.vue';
import { useDetail } from './useDetail';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const { slug, categories, subcategories } = useDetail(viewConfig);

const { isError, isSuccess, data, error, url } =
  useApiForViewConfig(viewConfig);
</script>

<style>
.subcategory-container {
  @apply flex-1;
  column-width: 250px;
}
</style>
