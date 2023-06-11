<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <PillButtonGroupItem
      v-for="(item, index) in data"
      :key="index"
      :is-first="index == 0"
      :is-last="index == data.length - 1"
      :is-selected="selected == index"
      :item="item"
      @change-selected-item="changeSelectedItem(item, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PillButtonGroupItem from './PillButtonGroupItem.vue';

const props = defineProps<{
  initialSelected: string;
  data: string[];
}>();

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'selectedChange', item: string): void }>();

const selected = ref<number>(props.data.indexOf(props.initialSelected));

watch(
  () => props.initialSelected,
  (newValue) => {
    selected.value = props.data.indexOf(newValue);
  }
);

const changeSelectedItem = (item: string, index: number) => {
  selected.value = index;
  emits('selectedChange', item);
};
</script>
