<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell
    :items="additionalPropertiesElements"
    @update="onUpdateAdditionalProperty"
  >
    <template #table="{ items }">
      <AdditionalPropertiesTable
        :items="items"
        @add="onAddAdditionalProperty"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import AdditionalPropertiesTable from './AdditionalPropertiesTable.vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import {
  AdditionalPropertiesOptions,
  availableAdditionalPropertiesOptions,
} from './propertyOptions';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import { randomId } from '../../../../../components/utils/random';

const emit = defineEmits(['update']);

const props = defineProps<{
  additionalProperties?: Record<string, unknown> | undefined;
}>();

const { additionalProperties } = toRefs(props);

const _additionalProperties = ref<Record<string, unknown>>({});

const additionalPropertiesElements = computed<AdditionalPropertiesOptions[]>(
  () => {
    if (!_additionalProperties.value) return [];

    return Object.keys(_additionalProperties.value).map((item) => {
      const option = availableAdditionalPropertiesOptions.find((el) =>
        el.value.includes(item)
      ) ?? {
        label: '',
        value: '',
        slug: '',
      };

      return option;
    });
  }
);

const onAddAdditionalProperty = () => {
  _additionalProperties.value[randomId()] = {};
};

const onUpdateAdditionalProperty = (updateItem: {
  prop: string;
  value: AdditionalPropertiesOptions[];
}) => {
  const newProperties = updateItem.value.map(
    (item) => item.value.split('AdditionalProperties.')[1]
  );

  const newPropertiesObject = {} as Record<string, Record<string, unknown>>;

  for (const newProperty of newProperties) {
    newPropertiesObject[newProperty] = {};
  }

  emit('update', {
    prop: 'additionalProperties',
    value: newPropertiesObject,
  });
};

const setLocalAdditionalProperties = (
  additionalProperties: Record<string, unknown> | undefined
) => {
  _additionalProperties.value = additionalProperties
    ? JSON.parse(JSON.stringify(additionalProperties))
    : {};
};

watch(additionalProperties, (newVal) => {
  setLocalAdditionalProperties(newVal);
});

onMounted(() => {
  setLocalAdditionalProperties(additionalProperties.value);
});
</script>
