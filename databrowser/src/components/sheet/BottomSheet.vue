<template>
  <Dialog
    :open="props.showSheet"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div class="relative py-3 w-full bg-white rounded-t">
        <div class="flex flex-col justify-center px-3 space-y-3 w-full">
          <button class="mx-auto" @click="closeDialog">
            <IconClose />
          </button>
          <slot />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import IconClose from '../svg/IconClose.vue';

const props = defineProps<{
  showSheet: boolean;
}>();

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'close'): void;
}>();

function closeDialog() {
  emit('close');
}
</script>
