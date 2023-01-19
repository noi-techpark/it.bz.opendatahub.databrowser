<template>
  <div>
    <DialogCustom :is-open="showDialog">
      <template #title>{{ title }}</template>
      <template #description>{{ description }}</template>
      <template #body>
        <ButtonCustom @click="confirmDelete">Yes (y)</ButtonCustom>
        <ButtonCustom :variant="Variant.ghost" @click="closeDialog">
          No (n)
        </ButtonCustom>
      </template>
    </DialogCustom>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import DialogCustom from '../../../../../../components/dialog/DialogCustom.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';

const emit = defineEmits(['close', 'confirmDelete']);

const props = defineProps<{
  showDialog: boolean;
  title: string;
  description: string;
}>();

const confirmDelete = () => emit('confirmDelete');

const closeDialog = () => emit('close');

onKeyStroke('y', () => {
  // Don't handle key stroke if dialog is not visible
  if (!props.showDialog) {
    return;
  }
  confirmDelete();
});

onKeyStroke('n', () => {
  // Don't handle key stroke if dialog is not visible
  if (!props.showDialog) {
    return;
  }
  closeDialog();
});
</script>
