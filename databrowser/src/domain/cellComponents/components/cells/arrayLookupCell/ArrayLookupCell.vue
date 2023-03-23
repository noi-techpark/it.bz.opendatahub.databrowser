<template>
  <EditListCell :items="items">
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <template #table="{ items }">
      <ArrayLookupTable
        v-if="response.isSuccess"
        :options="options"
        :items="items"
        :unique="enableUniqueValue"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs, withDefaults } from 'vue';
import { useQuery } from 'vue-query';
import {
  replacePlaceholders,
  unifyPagination,
  useApiParameterReplacements,
  useAxiosFetcher,
} from '../../../../api';
import EditListCell from '../../utils/editList/EditListCell.vue';
import ArrayLookupTable from './ArrayLookupTable.vue';
import * as R from 'ramda';
import { SelectOption } from '../../../../../components/select/types';

const props = withDefaults(
  defineProps<{
    lookupUrl: string;
    keySelector: string;
    labelSelector: string;
    items?: { name: string }[] | null;
    unique?: boolean | string;
  }>(),
  {
    items: () => [],
    unique: false,
  }
);

const enableUniqueValue = computed(() => {
  // if unique is a boolean, return it
  if (typeof props.unique === 'boolean') {
    return props.unique;
  }
  // if unique is a string, return the boolean value of the string
  if (typeof props.unique === 'string') {
    return props.unique.toLocaleLowerCase() === 'true';
  }
  return false;
});

const { lookupUrl: queryKey, keySelector, labelSelector } = toRefs(props);

const queryFn = useAxiosFetcher();
const response = useQuery({ queryKey, queryFn });

const replacements = useApiParameterReplacements();

const options = computed<(SelectOption & { url: string })[]>(() => {
  const replace = (s: string): string =>
    replacePlaceholders(s, replacements.value);
  const keySelectorWithReplacements = replace(keySelector.value);
  const labelSelectorWithReplacements = replace(labelSelector.value);

  if (response.isSuccess.value) {
    const { items } = unifyPagination(response.data.value?.data);
    return items.map((item: any) => ({
      label: getPropertyValue(item, labelSelectorWithReplacements),
      value: getPropertyValue(item, keySelectorWithReplacements),
      url: item.PublisherUrl,
    }));
  }
  return [];
});

const getPropertyValue = (item: unknown, jsonPath: string) => {
  const path = jsonPath.split('.');
  const lensePath = R.lensPath(path);
  return R.view(lensePath, item);
};
</script>
