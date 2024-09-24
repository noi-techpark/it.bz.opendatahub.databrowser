<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <LoadingError v-if="isError" :error="error" />
  <template v-else>
    <div class="flex md:overflow-y-auto">
      <MainAndSubCategories
        :data="data"
        :categories="categories"
        :sub-categories="subcategories"
        :current-category="currentCategory"
        :slug="slug"
        :show-edit-hint="false"
        :editable="false"
      />
      <ExportDatasetsAndSettingsToolBox
        :url="fullPath"
        :references-urls="referencesUrls"
        use-custom-button-labels
      />
      <GoToReferenceAttributeDialog />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import LoadingError from '../../../../components/loading/LoadingError.vue';
import MainAndSubCategories from '../common/MainAndSubCategories.vue';
import { useSingleRecordLoad } from '../common/load/useSingleRecordLoad';
import ExportDatasetsAndSettingsToolBox from '../toolBox/ExportDatasetsAndSettingsToolBox.vue';
import GoToReferenceAttributeDialog from '../common/dialogs/goToReferenceAttributeDialog/GoToReferenceAttributeDialog.vue';
import { ReferenceInfoToolBoxFetchUrlInfo } from '../toolBox/types';

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

const referencesUrls = computed(() => {
  return categories.value
    ? categories.value.flatMap((category) =>
        category.subCategories.flatMap(
          (subCategory) =>
            subCategory.properties
              .map((property) => {
                const referenceInfo = property.referenceInfo;
                if (referenceInfo && referenceInfo.url) {
                  return {
                    from: referenceInfo.from || referenceInfo.url,
                    url: referenceInfo.url,
                  };
                }
                return null;
              })
              .filter(
                (item) => item !== null
              ) as ReferenceInfoToolBoxFetchUrlInfo[]
        )
      )
    : [];
});
</script>
