<template>
  <div>
    <ToggleCustom
      v-model="enabledInternal"
      @update:model-value="emit('update', { prop: 'enabled', value: $event })"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, withDefaults } from 'vue';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
  }>(),
  {
    enabled: false,
  }
);

const enabledInternal = ref(props.enabled);
</script>
