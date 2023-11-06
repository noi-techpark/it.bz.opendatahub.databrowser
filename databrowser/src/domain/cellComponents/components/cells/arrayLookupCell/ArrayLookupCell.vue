<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="items">
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <template #table="{ items }">
      <ArrayLookupTable
        v-if="isFinished && !isError"
        :options="options"
        :items="items"
        :unique="enableUniqueValue"
      />
      <div v-else-if="isFinished && isError" class="flex justify-center">
        <AlertError
          :title="`Error fetching data from ${lookupUrl}`"
          :content="JSON.stringify(error)"
          class="w-1/2"
        />
      </div>
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import EditListCell from '../../utils/editList/EditListCell.vue';
import ArrayLookupTable from './ArrayLookupTable.vue';
import { unwrapData } from '../../../../api/dataExtraction/dataExtraction';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';
import { useDatasetConfigStore } from '../../../../datasetConfig/store/datasetConfigStore';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import AlertError from '../../../../../components/alert/AlertError.vue';

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

const enableUniqueValue = computed(() =>
  booleanOrStringToBoolean(props.unique, false)
);

const { lookupUrl, keySelector, labelSelector } = toRefs(props);

const { getDataForField } = useDatasetConfigStore();

const { data, error, isFinished, isError } = useBaseAxiosFetch(lookupUrl, {
  afterFetch: (ctx) => {
    const items = unwrapData(ctx.data);
    return items.map((item: any) => ({
      label: getDataForField(item, labelSelector.value) as any,
      value: getDataForField(item, keySelector.value) as any,
      url: item.Url,
    }));
  },
});

const options = computed(() => data.value ?? []);
</script>
