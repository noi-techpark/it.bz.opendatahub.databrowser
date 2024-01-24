<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <EditListCell :items="recordAsItems" :editable="editable" @update="update">
    <template #table="{ items }">
      <MappingTable :mappings="items" />
    </template>
  </EditListCell>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';
import EditListCell from '../../utils/editList/EditListCell.vue';
import { useRecordSupportForCell } from '../../utils/editList/support/useRecordSupport';
import MappingTable from './MappingTable.vue';
import { ChildEntry, Mapping } from './types';

const props = withDefaults(
  defineProps<{
    mapping?: Record<string, Record<string, string>>;
    editable?: string | boolean;
  }>(),
  { mapping: () => ({}), editable: false }
);

const { mapping } = toRefs(props);

const editable = computed(() => booleanOrStringToBoolean(props.editable));

const emit = defineEmits(['update']);

const { recordAsItems, update } = useRecordSupportForCell<
  Record<string, string>,
  Mapping
>({
  record: mapping,
  prop: 'mapping',
  mapRecordToItems: (record) => {
    // Build list of entries, where each entry contains a list of child entries
    const items = Object.entries(record).map<Mapping>(([key, data]) => {
      const value = Object.entries(data).map<ChildEntry>(
        ([childKey, childValue]) => ({
          key: childKey,
          value: childValue,
        })
      );
      return { key, value };
    });

    if (!editable.value) {
      items.sort((a, b) => a.key.localeCompare(b.key));
    }

    return items;
  },
  mapUpdateToRecord: (items) => {
    return (
      (items ?? {})
        // Remove empty items
        .filter((item) => item != null)
        // Build record from items
        .reduce((prev, { key, value }) => {
          // value is a list of { key, value } pairs
          // They must be converted to a record { key1: value1, key2: value2 }
          const valueAsRecord = value.reduce(
            (prev, { key, value }) => ({ ...prev, [key]: value }),
            {}
          );

          return { ...prev, [key]: valueAsRecord };
        }, {})
    );
  },
  emit,
});
</script>
