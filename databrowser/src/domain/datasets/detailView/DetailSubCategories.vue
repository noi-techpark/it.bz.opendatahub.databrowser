<template>
  <div v-for="subcategory in subCategories" :key="subcategory.name">
    <div class="inline-block w-full">
      <div class="p-4 font-bold bg-gray-200">
        {{ subcategory.name }}
      </div>
      <div class="flex flex-col gap-2 my-3">
        <SubCategory
          v-for="property in subcategory.properties"
          :key="property.title"
          :title="property.title"
        >
          <ListCell
            :tag-name="property.component"
            :attributes="getValue(data, property.fields, property.params)"
            :class="property.class"
          />
        </SubCategory>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { useFieldExtraction } from '../../api/configUtils';
import ListCell from '../../../components/listCell/ListCell.vue';
import { PropertyConfig } from '../../../config/types';
import SubCategory from './SubCategory.vue';

export interface DetailSubCategory {
  name: string;
  properties: PropertyConfig[];
}

const props = defineProps<{
  data: unknown;
  subCategories: DetailSubCategory[];
}>();

const { data, subCategories } = toRefs(props);

const { getValue } = useFieldExtraction();
</script>
