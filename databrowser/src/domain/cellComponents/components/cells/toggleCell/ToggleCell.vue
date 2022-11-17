<template>
  <div>
    <ToggleCustom
      v-model="enabledInternal"
      :disabled="disabled"
      @update:model-value="emit('update', { prop: 'enabled', value: $event })"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, withDefaults } from 'vue';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
    preventChange?: string;
  }>(),
  {
    enabled: false,
    preventChange: 'false',
  }
);

const enabledInternal = ref(props.enabled);
const disabled = computed(() => {
  if (typeof props.preventChange !== 'string') {
    return false;
  }
  return props.preventChange.trim().toLowerCase() === 'true';
});
</script>
