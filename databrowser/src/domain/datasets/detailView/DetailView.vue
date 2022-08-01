<template>
  <template v-if="isError">
    <ShowApiError :error="error" />
  </template>
  <template v-if="isSuccess === true">
    <div>
      <ContentAlignmentX>
        <RadioCustom
          v-model="showAll"
          value="false"
          label="show only non empty"
          class="mr-2"
        />
        <RadioCustom v-model="showAll" value="true" label="show all" />
      </ContentAlignmentX>
    </div>
    <div class="flex overflow-y-auto">
      <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
        <MainCategories
          :categories="categories"
          :slug="slug"
          class="overflow-y-auto sticky top-0 py-6 bg-white md:w-1/6 md:h-full"
        />

        <SubCategories
          v-if="slug !== ''"
          class="overflow-y-auto flex-1 pb-6 md:py-6 md:px-20 md:h-full"
          :data="data"
          :category="currentCategory"
          :sub-categories="subcategories"
          :show-all="showAll === 'true'"
        />
      </ContentAlignmentX>
      <ExportDatasetToolBox :url="url" :is-table-view="false" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApiForCurrentDataset } from '../../api/client/client';
import MainCategories from '../category/MainCategories.vue';
import SubCategories from '../category/SubCategories.vue';
import { useDetail } from './useDetail';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import RadioCustom from '../../../components/radio/RadioCustom.vue';
import ShowApiError from '../../api/components/ShowApiError.vue';
import ExportDatasetToolBox from '../toolbox/ExportDatasetToolBox.vue';

const showAll = ref<string>('false');

const { slug, categories, subcategories, currentCategory } = useDetail();

const { isError, isSuccess, data, error, url } = useApiForCurrentDataset();
</script>
