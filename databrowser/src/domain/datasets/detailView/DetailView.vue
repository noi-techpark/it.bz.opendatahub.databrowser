<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-else>
    <div>
      <ShowEmptyFields v-model="showAll" />
    </div>
    <div class="flex md:overflow-y-auto">
      <MainAndSubCategories
        :data="data"
        :categories="categories"
        :sub-categories="subcategories"
        :current-category="currentCategory"
        :slug="slug"
        :show-all="showAll"
        :show-edit-hint="false"
        :editable="false"
        :is-start-or-fetch="isStartOrFetch"
      />
      <ExportDatasetsToolBox :url="url" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiReadForCurrentDataset } from '../../api';
import { useCategories } from '../category/useCategories';
import ExportDatasetsToolBox from '../toolBox/ExportDatasetsToolBox.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';
import MainAndSubCategories from '../common/MainAndSubCategories.vue';
import LoadingError from '../../../components/loading/LoadingError.vue';

const showAll = ref(false);

const { slug, categories, subcategories, currentCategory } = useCategories();

const { isError, isStartOrFetch, data, error, url } =
  useApiReadForCurrentDataset();
</script>
