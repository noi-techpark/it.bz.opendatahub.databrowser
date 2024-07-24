<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="flex flex-col gap-6">
    <div v-if="editable" class="mt-2 flex flex-col gap-2">
      <CheckboxCustom
        v-for="({ label, value }, index) in propertyTypes"
        :key="label"
        :label="label"
        :model-value="value"
        @update:model-value="handleCheckboxChange(index)"
      />
    </div>

    <AdditionalPropertiesWrapper
      v-for="{ label, propertyName, componentName } in activePropertyTypes"
      :key="propertyName"
      :label="label"
      :component="componentName"
      :property-value="getPropertyValue(propertyName)"
      :editable="editable"
      @update="emitUpdate(propertyName, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import CheckboxCustom from '../../../../../components/checkbox/CheckboxCustom.vue';
import {
  AdditionalProperties,
  AdditionalPropertyName,
  AdditionalPropertyType,
} from './types';
import { propertiesOptions } from './propertyOptions';
import AdditionalPropertiesWrapper from './AdditionalPropertiesWrapper.vue';

const props = withDefaults(
  defineProps<{
    additionalProperties?: Partial<AdditionalProperties>;
    editable?: boolean;
  }>(),
  {
    additionalProperties: () => ({}),
    editable: false,
  }
);

const propertyTypes = ref(propertiesOptions(props.additionalProperties));

const activePropertyTypes = computed(() =>
  propertyTypes.value.filter((s) => s.value === true)
);

const handleCheckboxChange = (index: number) => {
  propertyTypes.value[index].value = !propertyTypes.value[index].value;
};

const getPropertyValue = <T = AdditionalPropertyType>(
  propertyName: AdditionalPropertyName
) => props.additionalProperties[propertyName] as T;

const emit = defineEmits(['update']);

const emitUpdate = (baseProp: keyof AdditionalProperties, value: any) => {
  const newValue = { ...props.additionalProperties, [baseProp]: value };
  emit('update', { prop: 'additionalProperties', value: newValue });
};
</script>
