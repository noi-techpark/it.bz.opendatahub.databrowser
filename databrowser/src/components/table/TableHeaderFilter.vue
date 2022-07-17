<template>
  <th v-if="filter != null" class="text-gray-900">
    <Dropdown
      :text="label"
      button-class="font-bold py-4 px-4"
      button-label-class="font-semibold uppercase"
      @visible="visible"
    >
      <template #default="{ events: { close } }">
        <Cell
          v-if="dropdownVisible"
          :tag-name="filter.component"
          :attributes="{ ...filter.params, initialValue }"
          @cancel="close"
          @save="save"
        />
      </template>
    </Dropdown>
  </th>
  <th v-else class="p-4 font-semibold text-gray-900 uppercase">
    {{ text }}
  </th>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRefs } from 'vue';
import { FilterConfig } from '../../domain/datasetConfig/types';
import { useApiQuery } from '../../domain/api/service/apiQueryHandler';
import { useAsList } from '../../domain/api/service/utils';
import { FilterValue } from '../../domain/cellComponents/components/filters/types';
import Dropdown from '../dropdown/Dropdown.vue';
import Cell from '../listCell/ListCell.vue';

const props = defineProps<{
  text: string;
  filter?: FilterConfig;
}>();

const { text, filter } = toRefs(props);

const { updateApiParameterValue, useApiParameter } = useApiQuery();
const initialValue = computed({
  get: () =>
    filter?.value?.name != null
      ? useAsList(useApiParameter(filter.value.name)).value
      : [],
  set: (value) => {
    if (filter?.value?.name != null) {
      updateApiParameterValue(filter.value.name, value);
      setLabel();
    }
  },
});

// Compute label with number of active filters
// The label can not be computed in a reactive way from initialValue,
// because label is displayed in the Dropdown component, which in turn
// shows the filter / initialValue, which again modifies the label.
// This creates a circular dependency that is not allowed. The imperative
// approach implemented below solves that issue (although not in a nice way).
const label = ref('');
const setLabel = () => {
  const filterValue = initialValue.value;
  const count = filterValue.length > 0 ? ` (${filterValue.length})` : '';
  label.value = text.value + count;
};
setLabel();

const save = (value: FilterValue) => (initialValue.value = value);

const dropdownVisible = ref(false);

const visible = (isVisible: boolean) => (dropdownVisible.value = isVisible);
</script>
