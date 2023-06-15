<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TextAreaCustom
    v-if="isWriteable"
    input-classes="w-full"
    :model-value="text"
    :rows="rows"
    :cols="cols"
    @update:model-value="update($event)"
  />
  <span v-else class="whitespace-pre-line">{{ text }}</span>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import TextAreaCustom from '../../../../../components/textarea/TextAreaCustom.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = defineProps<{
  text?: string;
  rows?: string | number;
  cols?: string | number;
  editable?: boolean;
  readonly?: string | boolean;
}>();

const { editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const update = (value: unknown) =>
  emit('update', {
    prop: 'text',
    value,
  });
</script>
