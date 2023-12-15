<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="gpsInfo">
    <template #table="{ items }">
      <EditGpsInfoTable :items="items" />
    </template>
    <template #tab="{ items }">
      <EditGpsInfoTab :items="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import { useApiRead } from '../../../../api/useApi';
import EditListCell from '../../utils/editList/EditListCell.vue';
import EditGpsInfoTab from './EditGpsInfoTab.vue';
import EditGpsInfoTable from './EditGpsInfoTable.vue';
import { useEditGpsInfoCellStore } from './editGpsInfoCellStore';
import { GpsInfoEntry } from './types';

const editGpsInfoCellStore = useEditGpsInfoCellStore();

const props = withDefaults(
  defineProps<{
    gpsInfo?: GpsInfoEntry[] | null;
    positionValuesUrl: string;
  }>(),
  {
    gpsInfo: () => [],
  }
);

const { positionValuesUrl } = toRefs(props);

const { data: positionValues } = useApiRead<string[]>(positionValuesUrl);

watch(
  () => positionValues.value,
  (newVal) => {
    setPositionValuesInStore(newVal);
  }
);

const setPositionValuesInStore = (data?: string[]) => {
  if (!data) {
    editGpsInfoCellStore.setPositionOptions([]);
    return;
  }

  editGpsInfoCellStore.setPositionOptions(
    data.map<SelectOption>((item) => ({
      value: item,
      label: item,
    }))
  );
};
</script>
