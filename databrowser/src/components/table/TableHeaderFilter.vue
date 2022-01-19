<template>
  <th v-if="hasFilter" class="text-gray-900">
    <Dropdown :text="text" button-class="font-bold py-4 px-4"
      ><slot></slot
    ></Dropdown>
  </th>
  <th v-else class="py-4 px-4 text-gray-900">
    {{ text }}
  </th>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Dropdown from '../dropdown/Dropdown.vue';

defineProps<{
  text: string;
  hasFilter: boolean;
}>();
</script>
