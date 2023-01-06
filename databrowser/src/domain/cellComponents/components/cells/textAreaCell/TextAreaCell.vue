<template>
  <TextAreaCustom
    v-if="isWriteable"
    input-classes="w-full"
    :model-value="text"
    :rows="rows"
    :cols="cols"
    @update:model-value="update($event)"
  />
  <span v-else class="whitespace-pre-line">{{ text }}</span>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs } from 'vue';
import TextAreaCustom from '../../../../../components/textarea/TextAreaCustom.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = defineProps<{
  text?: string;
  rows?: string;
  cols?: string;
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
