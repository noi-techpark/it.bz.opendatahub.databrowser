<template>
  <th v-if="filter != null" class="text-gray-900">
    <Dropdown
      :text="text"
      button-class="font-bold py-4 px-4"
      button-label-class="font-semibold"
      @visible="visible"
    >
      <template #default="{ events: { close } }">
        <Cell
          v-if="dropdownVisible"
          :tag-name="filter.component"
          :attributes="{ ...filter.params, currentValue }"
          @cancel="close"
          @save="save"
        />
      </template>
    </Dropdown>
  </th>
  <th v-else class="py-4 px-4 font-semibold text-gray-900">
    {{ text }}
  </th>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { FilterConfig } from '../../config/types';
import { useApiQuery } from '../../lib/apiQuery/apiQueryHandler';
import Dropdown from '../dropdown/Dropdown.vue';
import Cell from '../listCell/ListCell.vue';

const props = defineProps<{
  text: string;
  filter?: FilterConfig;
}>();

const { filter } = toRefs(props);

const currentValue =
  filter?.value?.name != null
    ? useApiQuery().useApiParameter(filter.value.name)
    : ref('');

const save = (value: string) => (currentValue.value = value);

const dropdownVisible = ref(false);

const visible = (isVisible: boolean) => (dropdownVisible.value = isVisible);
</script>
