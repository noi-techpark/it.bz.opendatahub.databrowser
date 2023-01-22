<template>
  <div>
    <StringCell
      v-if="isWriteable"
      :text="text"
      :editable="editable"
      @update="emit('update', { prop: 'text', value: $event.value })"
    />
    <span v-if="!isWriteable && text != null" class="break-all">
      <a :href="text" target="_blank">
        {{ text }}
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, withDefaults } from 'vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import StringCell from '../stringCell/StringCell.vue';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    text?: string | undefined;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    text: undefined,
    editable: true,
    readonly: false,
  }
);

const { text, editable, readonly } = toRefs(props);

const isWriteable = useWriteable({ editable, readonly });
</script>
