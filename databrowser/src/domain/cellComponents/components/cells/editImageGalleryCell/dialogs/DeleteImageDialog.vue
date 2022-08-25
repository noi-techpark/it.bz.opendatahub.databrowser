<template>
  <DialogCustom :is-open="dialogsStore.dialogVisible">
    <template #title>{{ title }}</template>
    <template #description>{{ description }}</template>
    <template #body>
      <ButtonCustom @click="confirmDelete">Yes (y)</ButtonCustom>
      <ButtonCustom :variant="Variant.ghost" @click="closeDialog">
        No (n)
      </ButtonCustom>
    </template>
  </DialogCustom>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import DialogCustom from '../../../../../../components/dialog/DialogCustom.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';
import { useDeleteImageDialogStore } from './deleteImageDialogStore';

const emit = defineEmits(['confirmDelete']);

defineProps<{ title: string; description: string }>();

const dialogsStore = useDeleteImageDialogStore();

const confirmDelete = () => {
  closeDialog();
  emit('confirmDelete');
};

const closeDialog = () => (dialogsStore.dialogVisible = false);

onKeyStroke('y', () => {
  // Don't handle key stroke if dialog is not visible
  if (!dialogsStore.dialogVisible) {
    return;
  }
  confirmDelete();
});

onKeyStroke('n', () => {
  // Don't handle key stroke if dialog is not visible
  if (!dialogsStore.dialogVisible) {
    return;
  }
  closeDialog();
});
</script>
