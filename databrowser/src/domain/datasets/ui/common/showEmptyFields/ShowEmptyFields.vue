<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div :class="[containerClasses, showAll ? 'bg-red-100' : '']">
    <div :class="wrapperClasses">
      <div class="truncate text-sm" :class="{ 'text-red-500': showAll }">
        {{ t('datasets.detailView.showEmptyFields') }}
      </div>
      <ToggleCustom
        v-model="showAll"
        :disabled="disabled"
        active-bg-class="bg-red-400"
        active-border-class="border-red-400"
        inactive-bg-class="bg-gray-400"
        inactive-border-class="border-gray-400"
        class="shrink-0"
        data-test="show-empty-fields"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';
import { containerClasses, wrapperClasses } from '../fieldsToggleStyles';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{ modelValue?: boolean; disabled?: boolean }>();

const showAll = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
