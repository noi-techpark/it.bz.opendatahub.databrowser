<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="listItems" :editable="editable">
    <template #table="{ items }">
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
import { useQuery } from 'vue-query';
import AlertError from '../../../../../components/alert/AlertError.vue';
import { SelectOption } from '../../../../../components/select/types';
import { randomId } from '../../../../../components/utils/random';
import { useAxiosFetcher } from '../../../../api';
import EditListCell from '../../utils/editList/EditListCell.vue';
import CustomDataArrayTable from './CustomDataArrayTable.vue';
import LoadingState from '../../../../../components/loading/LoadingState.vue';

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

const queryKey = url.value ?? randomId();
const queryFn = useAxiosFetcher();
const { data, isLoading, isSuccess, isError, error } = useQuery({
  queryKey,
  queryFn,
});

const options = computed<SelectOption[]>(() => {
  if (data.value == null || data.value.data == null) {
    return [];
  }

  const responseValue = data.value.data as string[];

  return responseValue.map<SelectOption>((item) => ({
    value: item,
    label: item,
  }));
});
</script>
