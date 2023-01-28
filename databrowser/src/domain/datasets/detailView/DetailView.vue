<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>
      <ShowEmptyFields v-model="showAll" />
    </div>
    <div class="flex overflow-y-auto">
      <MainAndSubCategories
        :data="data"
        :categories="categories"
        :sub-categories="subcategories"
        :current-category="currentCategory"
        :slug="slug"
        :show-all="showAll"
        :show-edit-hint="false"
        :editable="false"
      />
      <ExportDatasetToolBox :url="url" :is-table-view="false" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiReadForCurrentDataset } from '../../api';
import { useCategories } from '../category/useCategories';
import ShowApiError from '../../api/components/ShowApiError.vue';
import ExportDatasetToolBox from '../toolbox/ExportDatasetToolBox.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';
import MainAndSubCategories from '../common/MainAndSubCategories.vue';

const showAll = ref(false);

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isSuccess, data, error, url } = useApiReadForCurrentDataset();
</script>
