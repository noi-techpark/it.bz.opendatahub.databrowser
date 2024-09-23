<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <BaseSettingsToggle
    :label="t('datasets.detailView.showEmptyFields')"
    :description="
      hasDescription ? t('datasets.detailView.showEmptyFieldsDesc') : ''
    "
    active-color-class="red-500"
    :active="!!showAll"
    :custom-text-classes="customTextClasses"
    :use-container-classes="useContainerClasses"
  >
    <template #toggle>
      <ToggleCustom
        v-model="showAll"
        :disabled="disabled"
        active-bg-class="bg-red-400"
        active-border-class="border-red-400"
        inactive-bg-class="bg-gray-400"
        inactive-border-class="border-gray-400"
        class="shrink-0"
        data-test="show-empty-fields" /></template
  ></BaseSettingsToggle>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';
import { useToolBoxStore } from '../../toolBox/toolBoxStore';

import BaseSettingsToggle from '../BaseSettingsToggle.vue';

const toolBoxStore = useToolBoxStore();

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    hasDescription?: boolean;
    useContainerClasses?: boolean;
    customTextClasses?: string;
  }>(),
  {
    modelValue: undefined,
    disabled: false,
    hasDescription: false,
    useContainerClasses: true,
    customTextClasses: '',
  }
);

const showAll = computed({
  get: () => props.modelValue,
  set: (value) => {
    toolBoxStore.toggleShowAll(!!value);
    emit('update:modelValue', value);
  },
});

onMounted(() => {
  toolBoxStore.toggleShowAll(!!props.modelValue);
});
</script>
