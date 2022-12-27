<template>
  <Switch
    v-model="enabled"
    class="relative inline-flex h-5 w-10 items-center rounded-full border bg-white"
    :class="disabled ? 'border-gray-400' : 'border-green-400'"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span
      :class="[
        enabled ? 'translate-x-5' : 'translate-x-1',
        disabled ? 'bg-gray-400' : 'bg-green-400',
      ]"
      class="inline-block h-3 w-3 rounded-full transition duration-200 ease-in-out"
    />
  </Switch>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, withDefaults } from 'vue';
import { Switch } from '@headlessui/vue';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{ modelValue?: boolean; disabled?: boolean }>(),
  {
    modelValue: true,
  }
);

const enabled = ref(props.modelValue);
</script>
