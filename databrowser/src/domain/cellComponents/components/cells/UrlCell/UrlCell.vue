<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <StringCell
      v-if="isWriteable"
      :text="text"
      :editable="editable"
      @update="emit('update', { prop: 'text', value: $event.value })"
    />
    <span v-else class="break-all">
      <!-- Render URL as link for FQDN URLs -->
      <a v-if="isValidFqdn" :href="text" target="_blank">
        {{ text }}
      </a>
      <!-- Render URL as text for non-FQDN URLs -->
      <template v-else>
        {{ text }}
      </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import StringCell from '../stringCell/StringCell.vue';
import { useUrlCheck } from './useUrlCheck';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    text?: string | undefined;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    text: undefined,
    editable: true,
    readonly: false,
  }
);

const { text, editable, readonly } = toRefs(props);

const isWriteable = useWriteable({ editable, readonly });

const { isValidFqdn } = useUrlCheck(text);
</script>
