<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseSettingsToggle
    :label="t('datasets.detailView.showDeprecatedFields')"
    :description="
      hasDescription ? t('datasets.detailView.showDeprecatedFieldsDesc') : ''
    "
    active-color-class="deprecated"
    :active="!!showDeprecated"
    :use-wrapper-classes="useWrapperClasses"
    :use-container-classes="useContainerClasses"
    :custom-wrapper-classes="customWrapperClasses"
    :custom-text-classes="customTextClasses"
  >
    <template #toggle>
      <ToggleCustom
        v-model="showDeprecated"
        :disabled="disabled"
        active-bg-class="bg-deprecated"
        active-border-class="border-deprecated"
        inactive-bg-class="bg-gray-400"
        inactive-border-class="border-gray-400"
        class="shrink-0"
        data-test="show-deprecated-fields"
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

const showDeprecated = computed({
  get: () => props.modelValue,
  set: (value) => {
    toolBoxStore.toggleShowDeprecated(!!value);
    emit('update:modelValue', value);
  },
});
</script>
