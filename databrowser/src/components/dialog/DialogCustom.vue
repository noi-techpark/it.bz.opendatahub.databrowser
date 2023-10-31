<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-20" @close="emit('close')">
      <DialogOverlay />
      <DialogOverlayContainer>
        <DialogPanel
          class="w-full max-w-md overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all"
        >
          <DialogTitle
            as="h3"
            class="text-center text-xl font-semibold leading-6 text-dialog"
          >
            <slot name="title"></slot>
          </DialogTitle>
          <DialogDescription class="mt-4 text-center text-dialog">
            <slot name="description"></slot>
          </DialogDescription>
          <div class="mt-6 flex flex-col gap-2">
            <slot name="body"></slot>
          </div>
        </DialogPanel>
      </DialogOverlayContainer>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
} from '@headlessui/vue';

import DialogOverlay from './DialogOverlay.vue';
import DialogOverlayContainer from './DialogOverlayContainer.vue';

const emit = defineEmits(['close']);

defineProps<{ isOpen: boolean }>();
</script>
