<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverContent class="pt-2">
    <ButtonCustom
      class="w-full min-w-[20em] p-2"
      :size="Size.xs"
      :variant="Variant.ghost"
      @click="addFilterInternal"
    >
      Add filter for
      <span class="font-semibold uppercase">{{ title }}</span>
    </ButtonCustom>
  </PopoverContent>
  <PopoverContentDivider v-if="isFilterActive" />
  <PopoverContent v-if="isFilterActive" class="flex justify-center">
    <ButtonCustom
      class="flex min-w-[20em] items-center gap-2 p-2"
      :size="Size.xs"
      :variant="Variant.ghost"
      @click="removeFilter"
    >
      <IconDelete class="text-delete" /> Reset filter
    </ButtonCustom>
  </PopoverContent>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import ButtonCustom from '../../../../../components/button/ButtonCustom.vue';
import { Size, Variant } from '../../../../../components/button/types';
import PopoverContent from '../../../../../components/popover/PopoverContent.vue';
import PopoverContentDivider from '../../../../../components/popover/PopoverContentDivider.vue';
import IconDelete from '../../../../../components/svg/IconDelete.vue';
import { useTableFilterStore } from './tableFilterStore';

const emit = defineEmits(['addFilter', 'removeFilter']);

const props = withDefaults(
  defineProps<{
    title: string;
    propertyPath?: string;
  }>(),
  { propertyPath: undefined }
);

const { title, propertyPath } = toRefs(props);

const { addFilter, removeFilter } = useTableFilterStore();

const isFilterActive = useTableFilterStore().isFilterActive(propertyPath);

const addFilterInternal = () => {
  addFilter(title.value, propertyPath.value);
  emit('addFilter');
};
</script>
