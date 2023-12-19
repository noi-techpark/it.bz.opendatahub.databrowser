<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ContentAlignmentX class="md:flex md:overflow-y-auto md:px-0">
    <MainCategories
      :categories="categories"
      :slug="slug"
      class="sticky top-0 z-10 bg-white py-3 md:h-full md:w-1/6 md:overflow-y-auto"
      @change="scrollSubCategoriesToTop"
    />

    <!-- Wrapper container for scroll-to-top -->
    <div
      v-if="slug !== ''"
      ref="container"
      class="flex-1 overflow-y-auto pb-6 md:h-full md:px-20 md:py-3"
    >
      <EditHint v-if="showEditHint" class="mb-8" />
      <SubCategories
        :data="data"
        :category="currentCategory"
        :sub-categories="subCategories"
        :show-all="showAll"
        :show-deprecated="showDeprecated"
        :editable="editable"
      />
    </div>
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContentAlignmentX from '../../../../components/content/ContentAlignmentX.vue';
import MainCategories from '../category/MainCategories.vue';
import SubCategories from '../category/SubCategories.vue';
import { Category, SubCategory } from '../category/types';
import EditHint from '../editView/EditHint.vue';
import { scrollToTop } from './scrollToPosition';

defineProps<{
  data: unknown;
  categories: Category[];
  subCategories: SubCategory[];
  currentCategory: Category | undefined;
  slug: string;
  showAll: boolean;
  showDeprecated: boolean;
  showEditHint: boolean;
  editable: boolean;
}>();

// Scroll sub categories to top if main category changes
const container = ref<HTMLElement | null>(null);
const scrollSubCategoriesToTop = () => scrollToTop(container);
</script>
