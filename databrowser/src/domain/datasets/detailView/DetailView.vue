<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
      />
      <ExportDatasetsToolBox :url="fullPath" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ExportDatasetsToolBox from '../toolBox/ExportDatasetsToolBox.vue';
import ShowEmptyFields from '../common/showEmptyFields/ShowEmptyFields.vue';
import MainAndSubCategories from '../common/MainAndSubCategories.vue';
import LoadingError from '../../../components/loading/LoadingError.vue';
import { useSingleRecordLoad } from '../common/load/useSingleRecordLoad';

const showAll = ref(false);

const {
  isError,
  data,
  error,
  fullPath,
  slug,
  categories,
  subcategories,
  currentCategory,
} = useSingleRecordLoad();
</script>
