<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <ToggleCustom
      v-model="enabledInternal"
      :disabled="!isWriteable"
      @update:model-value="emit('update', { prop: 'enabled', value: $event })"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import ToggleCustom from '../../../../../components/toggle/ToggleCustom.vue';
import { useWriteable } from '../../utils/writeable/useWriteable';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
    editable?: boolean;
    readonly?: string | boolean;
  }>(),
  {
    enabled: false,
    editable: true,
    readonly: false,
  }
);

const { editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const enabledInternal = ref(props.enabled);
</script>
