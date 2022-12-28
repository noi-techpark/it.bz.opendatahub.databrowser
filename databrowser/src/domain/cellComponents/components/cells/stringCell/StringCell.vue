<template>
  <InputCustom
    v-if="isEditMode && !isReadonly"
    input-classes="w-full"
    :model-value="text"
    @update:model-value="update($event)"
  />
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import InputCustom from '../../../../../components/input/InputCustom.vue';

const emit = defineEmits(['update']);

const props = defineProps<{
  text?: string | boolean | number;
  isEditMode?: boolean;
  readonly?: string | boolean;
}>();

const isReadonly = computed(() => {
  if (typeof props.readonly === 'string') {
    return props.readonly.toLowerCase() === 'true';
  }
  return props.readonly;
});

const update = (value: unknown) =>
  emit('update', {
    prop: 'text',
    value,
  });
</script>

<style scoped>
.has-error input {
  @apply border-error text-error;
}
</style>
