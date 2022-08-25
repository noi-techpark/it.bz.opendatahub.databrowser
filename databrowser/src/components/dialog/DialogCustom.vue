<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-20" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25"></div>
      </TransitionChild>

      <div class="overflow-y-auto fixed inset-0">
        <div
          class="flex justify-center items-center p-4 min-h-full text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="overflow-hidden p-6 w-full max-w-md text-left align-middle bg-white rounded shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-xl font-semibold leading-6 text-center text-dialog"
              >
                <slot name="title"></slot>
              </DialogTitle>
              <DialogDescription class="mt-4 text-center text-dialog">
                <slot name="description"></slot>
              </DialogDescription>
              <div class="flex flex-col gap-2 mt-6">
                <slot name="body"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

const emit = defineEmits(['close']);

defineProps<{ isOpen: boolean }>();
</script>
