<template>
  <PopoverContent class="pt-2">
    <ButtonCustom
      class="w-full p-2"
      :size="Size.xs"
      :variant="Variant.ghost"
      @click="addFilter"
    >
      Access filter for
      <span class="font-semibold uppercase">{{ title }}</span>
    </ButtonCustom>
  </PopoverContent>
  <PopoverContentDivider v-if="isFilterActive" />
  <PopoverContent v-if="isFilterActive" class="flex justify-center">
    <ButtonCustom
      class="flex items-center gap-2 p-2"
      :size="Size.xs"
      :variant="Variant.ghost"
      @click="removeFilterByField"
    >
      <IconDelete class="text-delete" /> Reset filter
    </ButtonCustom>
  </PopoverContent>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../components/button/types';
import PopoverContent from '../../../../components/popover/PopoverContent.vue';
import PopoverContentDivider from '../../../../components/popover/PopoverContentDivider.vue';
import IconDelete from '../../../../components/svg/IconDelete.vue';
import { useTableFilter } from './useTableFilter';

const props = defineProps<{
  title: string;
  fields: Record<string, string>;
}>();

const { title, fields } = toRefs(props);

const { isFilterActive, addFilter, removeFilterByField } = useTableFilter(
  fields,
  title
);
</script>
