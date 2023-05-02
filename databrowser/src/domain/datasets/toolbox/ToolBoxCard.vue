<template>
  <div
    class="rounded border"
    :class="{ 'mt-5': marginTop, 'mb-4': marginBottom }"
  >
    <div
      class="flex items-center justify-between p-4"
      :class="{ 'text-black font-semibold': isFilter }"
    >
      <span>{{ label }}</span>
      <slot name="right">
        <button class="rounded p-1" @click="$emit('icon-click')">
          <slot name="icon"></slot>
        </button>
      </slot>
    </div>
    <div :class="{ 'bg-gray-50': !isFilter, 'border-t': isFilter }">
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
    isFilter?: boolean;
  }>(),
  { marginTop: false, marginBottom: true, breakAll: false, isFilter: false }
);
defineEmits(['icon-click']);
</script>
