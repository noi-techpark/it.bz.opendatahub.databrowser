<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <label :for="id" class="text-sm text-dialog">{{ label }}</label>
    <SelectCustom
      :id="id"
      :options="options"
      :value="value"
      :size="size"
      :show-search-when-at-least-count-options="
        showSearchWhenAtLeastCountOptions
      "
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { SelectOption, SelectSize, SelectValue } from './types';
import SelectCustom from './SelectCustom.vue';

defineProps<{
  label: string;
  options: SelectOption[];
  value?: SelectValue;
  size?: SelectSize;
  showSearchWhenAtLeastCountOptions?: number;
  id?: string;
}>();

defineEmits(['change']);
</script>
