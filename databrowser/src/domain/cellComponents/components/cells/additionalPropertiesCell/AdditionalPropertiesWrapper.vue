<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <h2 class="text-xl font-bold text-black">{{ label }}</h2>

    <EchargingDataCell
      v-if="component === 'EchargingDataCell'"
      :property-value="toType(propertyValue)"
      :editable="editable"
      @update="emit('update', $event)"
    />

    <ExampleDataCell
      v-if="component === 'ExampleDataCell'"
      :property-value="toType(propertyValue)"
      :editable="editable"
      @update="emit('update', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import EchargingDataCell from './EchargingDataCell.vue';
import ExampleDataCell from './ExampleDataCell.vue';
import {
  AdditionalPropertyComponentName,
  AdditionalPropertyType,
} from './types';

defineProps<{
  label: string;
  component: AdditionalPropertyComponentName;
  propertyValue: AdditionalPropertyType;
  editable: boolean;
}>();

const emit = defineEmits(['update']);

// Dirty helper function to cast the property value to the correct type
// If someone knows a better way to do this, please let me know
const toType = <T = unknown>(propertyValue: AdditionalPropertyType) =>
  propertyValue as T;
</script>
