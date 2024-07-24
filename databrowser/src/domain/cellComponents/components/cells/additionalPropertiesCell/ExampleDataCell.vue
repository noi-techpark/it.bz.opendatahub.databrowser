<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <AdditionalPropertySection label="Some example data">
      <SubCategoryItem title="Prop1">
        <StringCell
          :text="propertyValue.prop1"
          :editable="editable"
          @update="emitUpdate('prop1', $event.value)"
        />
      </SubCategoryItem>
      <SubCategoryItem title="Prop2">
        <ToggleCell
          :enabled="propertyValue.prop2"
          :editable="editable"
          @update="emitUpdate('prop2', $event.value)"
        />
      </SubCategoryItem>
    </AdditionalPropertySection>
  </div>
</template>

<script setup lang="ts">
import SubCategoryItem from '../../../../datasets/ui/category/SubCategoryItem.vue';
import StringCell from '../stringCell/StringCell.vue';
import ToggleCell from '../toggleCell/ToggleCell.vue';
import { ExampleDataProperties } from './types';
import AdditionalPropertySection from './AdditionalPropertySection.vue';

const props = withDefaults(
  defineProps<{
    propertyValue?: Partial<ExampleDataProperties>;
    editable?: boolean;
  }>(),
  {
    propertyValue: () => ({}),
    editable: false,
  }
);

const emit = defineEmits(['update']);

const emitUpdate = (prop: keyof ExampleDataProperties, value: any) => {
  const newValue = { ...props.propertyValue, [prop]: value };
  emit('update', newValue);
};
</script>
