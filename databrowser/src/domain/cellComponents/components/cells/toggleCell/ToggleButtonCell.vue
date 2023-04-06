<template>
  <div>
    <ToggleButton v-model="enabledInternal" :disabled="!isWriteable">
      {{ text }}
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, toRefs, withDefaults } from 'vue';
import { useWriteable } from '../../utils/writeable/useWriteable';
import ToggleButton from '../../../../../components/toggle/ToggleButton.vue';

const emit = defineEmits(['update']);

const props = withDefaults(
  defineProps<{
    text: string;
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

const { enabled, editable, readonly } = toRefs(props);
const isWriteable = useWriteable({ editable, readonly });

const enabledInternal = computed({
  get: () => enabled.value,
  set: (value: boolean) => emit('update', { prop: 'enabled', value }),
});
</script>
