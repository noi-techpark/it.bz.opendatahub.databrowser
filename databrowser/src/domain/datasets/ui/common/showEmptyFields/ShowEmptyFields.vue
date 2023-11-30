<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ContentAlignmentX class="mt-3 hidden items-center md:flex">
    <div class="mr-4 text-sm">
      {{ t('datasets.detailView.showEmptyFields') }}
    </div>
    <ToggleCustom
      v-model="showAll"
      :disabled="disabled"
      data-test="show-empty-fields"
    />
  </ContentAlignmentX>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ContentAlignmentX from '../../../../../components/content/ContentAlignmentX.vue';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';

const { t } = useI18n();

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{ modelValue?: boolean; disabled?: boolean }>();

const showAll = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
