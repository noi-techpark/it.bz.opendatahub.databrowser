<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <p
    :class="['cursor-pointer text-hint-info underline flex gap-1', textClasses]"
    @click="onGoToReference()"
  >
    {{ text }}
    <IconExternal />
  </p>
</template>

<script setup lang="ts">
import IconExternal from '../../../../../components/svg/IconExternal.vue';
import { useGoToReferenceAttributeDialogStore } from '../../../../datasets/ui/common/dialogs/goToReferenceAttributeDialog/goToReferenceAttributeDialogStore';

const goToReferenceAttributeDialogStore =
  useGoToReferenceAttributeDialogStore();

const props = defineProps<{
  text: string;
  value: string;
  referenceBasePath: string;
  textClasses?: string;
}>();

const onGoToReference = () => {
  goToReferenceAttributeDialogStore.setReferenceUrl(
    `${window.location.origin}/dataset/detail${props.referenceBasePath}/${props.value}`
  );
  goToReferenceAttributeDialogStore.setReferenceAttributeName(props.text);
  goToReferenceAttributeDialogStore.show();
};
</script>

<style scoped>
.has-error input {
  @apply border-error text-error;
}
</style>
