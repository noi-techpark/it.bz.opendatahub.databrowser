<template>
  <Switch
    v-model="enabled"
    class="inline-flex relative items-center w-10 h-5 bg-white rounded-full border"
    :class="disabled ? 'border-gray-400' : 'border-green-400'"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <span
      :class="[
        enabled ? 'translate-x-5' : 'translate-x-1',
        disabled ? 'bg-gray-400' : 'bg-green-400',
      ]"
      class="inline-block w-3 h-3 rounded-full transition duration-200 ease-in-out"
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
