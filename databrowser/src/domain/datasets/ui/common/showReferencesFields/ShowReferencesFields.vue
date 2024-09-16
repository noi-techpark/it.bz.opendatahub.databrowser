<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseSettingsToggle
    :label="t('datasets.detailView.showReferencedFields')"
    :description="
      hasDescription ? t('datasets.detailView.showReferencedFieldsDesc') : ''
    "
    active-color-class="reference"
    :active="!!showReferences"
    :use-wrapper-classes="useWrapperClasses"
    :use-container-classes="useContainerClasses"
    :custom-wrapper-classes="customWrapperClasses"
    :custom-text-classes="customTextClasses"
  >
    <template #toggle>
      <ToggleCustom
        v-model="showReferences"
        :disabled="disabled"
        active-bg-class="bg-reference"
        active-border-class="border-reference"
        inactive-bg-class="bg-gray-400"
        inactive-border-class="border-gray-400"
        class="shrink-0"
        data-test="show-reference-fields"
      /> </template
  ></BaseSettingsToggle>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';
import BaseSettingsToggle from '../BaseSettingsToggle.vue';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const toolBoxStore = useToolBoxStore();

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    hasDescription?: boolean;
    useContainerClasses?: boolean;
    useWrapperClasses?: boolean;
    customWrapperClasses?: string;
    customTextClasses?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: false,
    hasDescription: false,
    useContainerClasses: true,
    useWrapperClasses: true,
    customWrapperClasses: '',
    customTextClasses: '',
  }
);

const showReferences = computed({
  get: () => props.modelValue,
  set: (value) => {
    toolBoxStore.toggleShowReferences(!!value);
    emit('update:modelValue', value);
  },
});
</script>
