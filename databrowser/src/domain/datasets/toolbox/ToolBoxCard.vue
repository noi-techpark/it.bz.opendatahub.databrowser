<template>
  <div
    class="rounded border"
    :class="{ 'mt-5': marginTop, 'mb-4': marginBottom }"
  >
    <div class="flex justify-between p-4">
      <span>{{ label }}</span>
      <div class="cursor-pointer" @click="$emit('icon-click')">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="bg-gray-50">
      <div class="p-4" :class="{ 'break-all': breakAll }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, withDefaults } from 'vue';

withDefaults(
  defineProps<{
    label: string;
    marginTop?: boolean;
    marginBottom?: boolean;
    breakAll?: boolean;
  }>(),
  { marginTop: false, marginBottom: true, breakAll: false }
);
defineEmits(['icon-click']);
</script>
