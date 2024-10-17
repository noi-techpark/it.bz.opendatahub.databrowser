<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <DialogCustom :is-open="goToReferenceAttributeDialogStore.visible">
    <template #title>
      {{ t('components.dialogs.goToReferenceAttribute.title') }}
    </template>
    <template #description>
      {{
        t('components.dialogs.goToReferenceAttribute.description', {
          attribute: goToReferenceAttributeDialogStore.attributeName,
        })
      }}
      <span class="uppercase">
        "{{ goToReferenceAttributeDialogStore.attributeName }}"</span
      >.
    </template>
    <template #body>
      <ButtonCustom @click="onGoToReference()">
        {{ t('components.dialogs.goToReferenceAttribute.buttonConfirm') }}
      </ButtonCustom>
      <ButtonCustom
        class="mt-2"
        :variant="Variant.ghost"
        @click="goToReferenceAttributeDialogStore.hide()"
      >
        {{ t('components.dialogs.goToReferenceAttribute.buttonCancel') }}
      </ButtonCustom>
    </template>
  </DialogCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonCustom from '../../../../../../components/button/ButtonCustom.vue';
import { Variant } from '../../../../../../components/button/types';
import DialogCustom from '../../../../../../components/dialog/DialogCustom.vue';
import { useGoToReferenceAttributeDialogStore } from './goToReferenceAttributeDialogStore';

const { t } = useI18n();

const goToReferenceAttributeDialogStore =
  useGoToReferenceAttributeDialogStore();

const onGoToReference = () => {
  goToReferenceAttributeDialogStore.hide();
  window.location.href = goToReferenceAttributeDialogStore.referenceUrl;
};
</script>
