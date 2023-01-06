<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>
      <ShowEmptyFields v-model="showAll" />
    </div>
    <div class="flex overflow-y-auto">
      <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
        <MainCategories
          :categories="categories"
          :slug="slug"
          class="sticky top-0 z-20 bg-white py-3 md:h-full md:w-1/6 md:overflow-y-auto"
        />

        <SubCategories
          v-if="slug !== ''"
          class="flex-1 overflow-y-auto pb-6 md:h-full md:py-3 md:px-20"
          :data="data"
          :category="currentCategory"
          :sub-categories="subcategories"
          :show-all="showAll"
        />
      </ContentAlignmentX>
      <ExportDatasetToolBox :url="url" :is-table-view="false" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiReadForCurrentDataset } from '../../api';
import MainCategories from '../category/MainCategories.vue';
import SubCategories from '../category/SubCategories.vue';
import { useCategories } from '../category/useCategories';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import ShowApiError from '../../api/components/ShowApiError.vue';
import ExportDatasetToolBox from '../toolbox/ExportDatasetToolBox.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';

const showAll = ref(false);

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isSuccess, data, error, url } = useApiReadForCurrentDataset();
</script>
