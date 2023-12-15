<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <DialogCustom :is-open="showDialog">
      <template #title>{{ title }}</template>
      <template #description>{{ description }}</template>
      <template #body>
        <ButtonCustom :disabled="confirmButtonDisabled" @click="confirmDelete"
          >Yes (y)</ButtonCustom
        >
        <ButtonCustom
          :variant="Variant.ghost"
          :disabled="closeButtonDisabled"
          @click="closeDialog"
        >
          No (n)
        </ButtonCustom>
      </template>
    </DialogCustom>
  </div>
</template>

<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import DialogCustom from '../../../../../../components/dialog/DialogCustom.vue';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';

const emit = defineEmits(['close', 'confirmDelete']);

const props = defineProps<{
  showDialog: boolean;
  title: string;
  description: string;
  confirmButtonDisabled?: boolean;
  closeButtonDisabled?: boolean;
}>();

const confirmDelete = () => emit('confirmDelete');

const closeDialog = () => emit('close');

onKeyStroke('y', () => {
  // Don't handle key stroke if dialog is not visible or button is disabled
  if (!props.showDialog || props.confirmButtonDisabled) {
    return;
  }
  confirmDelete();
});

onKeyStroke('n', () => {
  // Don't handle key stroke if dialog is not visible or button is disabled
  if (!props.showDialog || props.closeButtonDisabled) {
    return;
  }
  closeDialog();
});
</script>
