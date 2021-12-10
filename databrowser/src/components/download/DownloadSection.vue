<template>
  <div class="mx-auto max-w-5xl">
    <div class="hidden lg:flex items-stretch space-x-4 h-full">
      <span class="self-center">Retrieve data based on table settings</span>

      <DownloadCell @action-clicked="copyToClipboard">
        <span class="font-semibold">API DATASET</span>
        <span class="font-mono text-xs text-gray-900">{{ dataset }}</span>
        <template #icon>
          <IconCopy />
        </template>
      </DownloadCell>

      <DownloadCell @action-clicked="$emit('downloadCsv')">
        <span class="font-semibold whitespace-nowrap">CSV</span>
        <template #icon>
          <IconDownload />
        </template>
      </DownloadCell>

      <DownloadCell @action-clicked="$emit('downloadJson')">
        <span class="font-semibold whitespace-nowrap">JSON</span>
        <template #icon>
          <IconDownload />
        </template>
      </DownloadCell>
    </div>
    <div class="inline-flex lg:hidden justify-end px-10 w-full">
      <button
        class="
          inline-flex
          justify-center
          items-center
          w-8
          h-8
          rounded-full
          border border-gray-300
        "
        @click="openDialog"
      >
        <ArrowUp />
      </button>
    </div>
  </div>

  <Dialog
    :open="dialogOpen"
    class="overflow-y-auto fixed inset-0 z-10"
    @close="closeDialog"
  >
    <div class="flex items-end w-full min-h-screen">
      <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
      <div
        class="flex relative flex-col gap-3 py-5 px-4 w-full bg-white rounded-t"
      >
        <button class="mx-auto" @click="closeDialog">
          <IconClose />
        </button>

        <div>
          <span class="self-center">Retrieve data based on table settings</span>
        </div>

        <hr />

        <DownloadCell @action-clicked="copyToClipboard">
          <span class="font-semibold">API DATASET</span>
          <span class="font-mono text-xs text-gray-900">{{ dataset }}</span>
          <template #icon>
            <IconCopy />
          </template>
        </DownloadCell>

        <div class="flex gap-3">
          <DownloadCell class="w-full" @action-clicked="$emit('downloadCsv')">
            <span class="font-semibold whitespace-nowrap">CSV</span>
            <template #icon>
              <IconDownload />
            </template>
          </DownloadCell>

          <DownloadCell class="w-full" @action-clicked="$emit('downloadJson')">
            <span class="font-semibold whitespace-nowrap">JSON</span>
            <template #icon>
              <IconDownload />
            </template>
          </DownloadCell>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import ArrowUp from '../svg/ArrowUp.vue';
import IconCopy from '../svg/IconCopy.vue';
import IconDownload from '../svg/IconDownload.vue';
import IconClose from '../svg/IconClose.vue';

export default defineComponent({
  components: {
    IconDownload,
    IconCopy,
    ArrowUp,
    DownloadCell,
    Dialog,
    DialogOverlay,
    IconClose,
  },
  props: {
    dataset: {
      type: String,
      required: true,
    },
  },
  emits: ['downloadCsv', 'downloadJson'],
  setup(props) {
    let dialogOpen = ref<boolean>(false);

    function copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.dataset);
      }
    }

    function closeDialog() {
      dialogOpen.value = false;
    }

    function openDialog() {
      dialogOpen.value = true;
    }

    return {
      dialogOpen,
      copyToClipboard,
      openDialog,
      closeDialog,
    };
  },
});
</script>
