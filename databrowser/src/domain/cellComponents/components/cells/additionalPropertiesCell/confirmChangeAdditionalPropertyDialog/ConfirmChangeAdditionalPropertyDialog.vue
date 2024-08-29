<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DialogCustom :is-open="confirmStore.visible">
    <template #title>
      {{ t('components.dialogs.confirmChangeAdditionalProperty.title') }}
    </template>
    <template #description>
      {{
        t('components.dialogs.confirmChangeAdditionalProperty.description', {
          attribute: '',
        })
      }}
    </template>
    <template #body>
      <ButtonCustom @click="onConfirm()">
        {{
          t('components.dialogs.confirmChangeAdditionalProperty.buttonConfirm')
        }}
      </ButtonCustom>
      <ButtonCustom class="mt-2" :variant="Variant.ghost" @click="onUndo()">
        {{
          t('components.dialogs.confirmChangeAdditionalProperty.buttonCancel')
        }}
      </ButtonCustom>
    </template>
  </DialogCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';
import DialogCustom from '../../../../../../components/dialog/DialogCustom.vue';
import { useConfirmChangeAdditionalPropertyDialogStore } from './confirmChangeAdditionalPropertyDialogStore';

const confirmStore = useConfirmChangeAdditionalPropertyDialogStore();

const emit = defineEmits(['confirm', 'undo']);

const { t } = useI18n();

const onConfirm = () => {
  emit('confirm');
};

const onUndo = () => {
  emit('undo');
};
</script>
