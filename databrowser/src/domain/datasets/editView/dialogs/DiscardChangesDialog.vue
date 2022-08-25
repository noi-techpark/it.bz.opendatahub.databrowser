<template>
  <DialogCustom :is-open="dialogsStore.discardChangesDialogVisible">
    <template #title>
      {{ t('datasets.editView.dialog.discardChanges.title') }}
    </template>
    <template #description>
      {{ t('datasets.editView.dialog.discardChanges.description') }}
    </template>
    <template #body>
      <ButtonCustom @click="discard">
        {{ t('datasets.editView.dialog.discardChanges.buttonYes') }}
      </ButtonCustom>
      <ButtonCustom :variant="Variant.ghost" @click="closeDialog">
        {{ t('datasets.editView.dialog.discardChanges.buttonNo') }}
      </ButtonCustom>
    </template>
  </DialogCustom>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { onKeyStroke } from '@vueuse/core';
import DialogCustom from '../../../../components/dialog/DialogCustom.vue';
import ButtonCustom from '../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../components/button/types';
import { useDialogsStore } from './dialogsStore';

const { t } = useI18n();

const emit = defineEmits(['discard']);

const discard = () => {
  closeDialog();
  emit('discard');
};

const closeDialog = () => (dialogsStore.discardChangesDialogVisible = false);

const dialogsStore = useDialogsStore();

onKeyStroke('y', () => {
  // Don't handle key stroke if dialog is not visible
  if (!dialogsStore.discardChangesDialogVisible) {
    return;
  }
  discard();
});

onKeyStroke('n', () => {
  // Don't handle key stroke if dialog is not visible
  if (!dialogsStore.discardChangesDialogVisible) {
    return;
  }
  closeDialog();
});
</script>
