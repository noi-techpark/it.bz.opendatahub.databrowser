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
    <ContentAlignmentX
      class="overflow-y-auto flex-wrap md:flex md:gap-20 md:px-0 md:mt-12"
    >
      <DetailCategories
        :categories="categories"
        :slug="slug"
        class="sticky top-0 my-5 bg-white md:my-0 md:w-1/6 md:h-full"
      />

      <DetailSubCategories
        v-if="slug !== ''"
        class="w-full md:w-1/3"
        :data="data"
        :category="currentCategory"
        :sub-categories="subcategories"
        :show-all="showAll === 'true'"
      />
    </ContentAlignmentX>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, ref, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import { useApiForViewConfig } from '../../api/client/client';
import DetailCategories from './DetailCategories.vue';
import DetailSubCategories from './DetailSubCategories.vue';
import { useDetail } from './useDetail';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import RadioCustom from '../../../components/radio/RadioCustom.vue';
import ShowApiError from '../../api/components/ShowApiError.vue';

const props = defineProps<{ viewConfig: ViewConfig }>();
const { viewConfig } = toRefs(props);

const showAll = ref<string>('false');

const { slug, categories, subcategories, currentCategory } =
  useDetail(viewConfig);

const { isError, isSuccess, data, error } = useApiForViewConfig({
  viewConfig,
});
</script>
