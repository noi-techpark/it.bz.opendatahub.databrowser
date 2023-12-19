<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <h2 v-if="category != null" class="mb-5 hidden text-xl font-bold md:block">
      {{ category.name }}
    </h2>
    <div
      v-for="(subcategory, subcategoryIndex) in subCategoriesWithValues"
      :key="toKey(subcategory.name, subcategoryIndex)"
      class="mb-4"
    >
      <h3 class="font-bold">{{ subcategory.name }}</h3>
      <ContentDivider class="my-1" />
      <div class="flex flex-col text-gray-500">
        <SubCategoryItem
          v-for="(property, propertyIndex) in subcategory.properties"
          :key="toKey(property.title, propertyIndex)"
          :title="property.title"
          :tooltip="property.tooltip"
          :required="property.required"
          :deprecation-info="property.deprecationInfo"
          :errors="property.errors"
          :has-empty-value="property.empty"
          :data-test="`subcategory-item-${titleToDataTest(property.title)}`"
        >
          <ComponentRenderer
            :tag-name="property.component"
            :attributes="property.value"
            :object-mapping="property.objectMapping"
            :array-mapping="property.arrayMapping"
            :class="property.class"
            :editable="editable"
          />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ComponentRenderer from '../../../../components/componentRenderer/ComponentRenderer.vue';
import ContentDivider from '../../../../components/content/ContentDivider.vue';
import SubCategoryItem from './SubCategoryItem.vue';
import { Category, SubCategory } from './types';
import { usePropertyComputation } from './usePropertyComputation';

const props = defineProps<{
  data: unknown;
  subCategories: SubCategory[];
  category?: Category;
  showAll?: boolean;
  editable?: boolean;
  showDeprecated?: boolean;
}>();

const { computeProperties } = usePropertyComputation();

const subCategoriesWithValues = computed(() =>
  props.subCategories.map((subCategory) => ({
    name: subCategory.name,
    properties: computeProperties(
      props.data,
      subCategory.properties,
      props.showAll ?? false,
      props.editable ?? false,
      props.showDeprecated ?? false
    ),
  }))
);

const toKey = (str: string | undefined, index: number) => `${str}_${index}`;

const titleToDataTest = (title: string) => {
  return title.toLowerCase().replaceAll(' ', '-');
};
</script>
