<template>
  <div>
    <h2 v-if="category != null" class="hidden mb-5 text-xl font-bold md:block">
      {{ category.name }}
    </h2>
    <div
      v-for="subcategory in subCategoriesWithValues"
      :key="subcategory.name"
      class="mb-4"
    >
      <h3 class="font-bold">{{ subcategory.name }}</h3>
      <ContentDivider class="my-1" />
      <div class="flex flex-col text-sm text-gray-500">
        <SubCategoryItem
          v-for="property in subcategory.properties"
          :key="property.title"
          :title="property.title"
          :tooltip="property.tooltip"
          :required="property.required"
        >
          <ComponentRenderer
            :tag-name="property.component"
            :attributes="getValue(data, property.fields, property.params)"
            :fields="property.fields"
            :class="property.class"
          />
        </SubCategoryItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import ComponentRenderer from '../../../components/componentRenderer/ComponentRenderer.vue';
import { useFieldExtraction } from '../../api';
import SubCategoryItem from './SubCategoryItem.vue';
import { Category, SubCategory } from './types';
import ContentDivider from '../../../components/content/ContentDivider.vue';
import { PropertyConfig } from '../../datasetConfig/types';

type PropertyConfigWithValue = PropertyConfig & {
  value: Record<string, string>;
};

const props = defineProps<{
  data: unknown;
  subCategories: SubCategory[];
  category?: Category;
  showAll?: boolean;
}>();

const subCategoriesWithValues = computed(() =>
  props.subCategories.map((sc) => ({
    name: sc.name,
    properties: computeAndFilterProperties(
      props.data,
      sc.properties,
      props.showAll
    ),
  }))
);

const computeAndFilterProperties = (
  data: any,
  properties: PropertyConfig[],
  showAll?: boolean
): PropertyConfigWithValue[] => {
  // Compute property values
  const propertiesWithValue = properties.map((property) => ({
    ...property,
    value: getValue(data, property.fields, property.params),
  }));

  // If all properties should be shown, return all properties.
  // Otherwise, return only properties with non-empty values.
  return showAll
    ? propertiesWithValue
    : propertiesWithValue.filter((p) => hasNonEmptyValue(p.value));
};

const hasNonEmptyValue = (o: Record<string, string>) =>
  Object.values(o).find((v) => v != null) != null;

const { getValue } = useFieldExtraction();
</script>
