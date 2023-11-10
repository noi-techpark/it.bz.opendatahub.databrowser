<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="listItems" :editable="editable">
    <template #table="{ items }">
      {{ url }}
      <AlertError
        v-if="url == null"
        title="Can not display options, no URL defined"
        content="This seems to be a configuration problem. Please contact support@opendatahub.com"
      />

      <LoadingState
        :is-loading="isLoading"
        :is-error="isError"
        :error="error"
      />
      <CustomDataArrayTable
        v-if="isSuccess || !editable"
        :items="items"
        :options="options"
      />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import AlertError from '../../../../../components/alert/AlertError.vue';
import { SelectOption } from '../../../../../components/select/types';
import EditListCell from '../../utils/editList/EditListCell.vue';
import CustomDataArrayTable from './CustomDataArrayTable.vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';

const props = withDefaults(
  defineProps<{
    listItems?: string[] | null;
    url?: string;
    editable?: boolean;
  }>(),
  {
    listItems: () => [],
    url: undefined,
    editable: true,
  }
);

const { listItems, url, editable } = toRefs(props);

const { data, isLoading, isSuccess, isError, error } =
  useBaseAxiosFetch<string[]>(url);

const options = computed<SelectOption[]>(() => {
  if (data.value == null) {
    return [];
  }

  return data.value.map<SelectOption>((item) => ({
    value: item,
    label: item,
  }));
});
</script>
