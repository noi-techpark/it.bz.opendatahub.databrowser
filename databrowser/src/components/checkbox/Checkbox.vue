<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex">
    <label class="inline-flex items-center">
      <input
        type="checkbox"
        class="w-5 h-5 text-green-700 rounded border-gray-400"
        :checked="checked"
        @change="emit('change', !checked)"
      /><span class="ml-3 font-semibold">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';

const props = defineProps<{
  checked: boolean;
  label: string;
}>();

// eslint-disable-next-line no-unused-vars
const emit = defineEmits<{ (e: 'change', checked: boolean): void }>();

const { checked, label } = toRefs(props);
</script>
