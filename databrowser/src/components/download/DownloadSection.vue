<template>
  <div class="mx-auto max-w-5xl">
    <div class="hidden lg:flex items-stretch space-x-4 h-full">
      <span class="self-center">Retrieve data based on table settings</span>

      <DownloadButtonCell
        :sub-title="datasetUrl"
        class="space-x-10"
        title="API DATASET"
        @clicked="copyToClipboard"
      >
        <IconCopy />
      </DownloadButtonCell>

      <DownloadLinkCell
        :data="downloadJson()"
        filename="dataset.json"
        title="JSON"
      >
        <IconDownload />
      </DownloadLinkCell>
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

        <DownloadButtonCell
          :sub-title="datasetUrl"
          title="API DATASET"
          @clicked="copyToClipboard"
        >
          <IconCopy />
        </DownloadButtonCell>

        <div class="flex gap-3">
          <DownloadLinkCell
            :data="downloadJson()"
            class="w-full"
            filename="dataset.json"
            title="JSON"
          >
            <IconDownload />
          </DownloadLinkCell>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import ArrowUp from '../svg/ArrowUp.vue';
import IconCopy from '../svg/IconCopy.vue';
import IconDownload from '../svg/IconDownload.vue';
import IconClose from '../svg/IconClose.vue';
import DownloadButtonCell from './DownloadButtonCell.vue';
import DownloadLinkCell from './DownloadLinkCell.vue';

export default defineComponent({
  components: {
    DownloadLinkCell,
    DownloadButtonCell,
    IconDownload,
    IconCopy,
    ArrowUp,
    Dialog,
    DialogOverlay,
    IconClose,
  },
  props: {
    datasetUrl: {
      type: String,
      required: true,
    },
    dataset: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let dialogOpen = ref<boolean>(false);

    function copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.datasetUrl);
      }
    }

    function closeDialog() {
      dialogOpen.value = false;
    }

    function openDialog() {
      dialogOpen.value = true;
    }

    function downloadJson() {
      return JSON.stringify(props.dataset);
    }

    return {
      dialogOpen,
      copyToClipboard,
      openDialog,
      closeDialog,
      downloadJson,
    };
  },
});
</script>
