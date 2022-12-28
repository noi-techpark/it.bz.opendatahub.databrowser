<template>
  <InputCustom
    v-if="isWriteable"
    input-classes="w-full"
    :model-value="text"
    @update:model-value="update($event)"
  />
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';
import InputCustom from '../../../../../components/input/InputCustom.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = defineProps<{
  text?: string | boolean | number;
  editable?: boolean;
  readonly?: string | boolean;
}>();

const { editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

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
