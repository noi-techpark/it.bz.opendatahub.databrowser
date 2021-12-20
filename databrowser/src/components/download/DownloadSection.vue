<template>
  <div class="fixed bottom-0 left-0 py-5 w-full bg-white">
    <div class="mx-auto max-w-5xl">
      <div class="hidden lg:flex items-stretch space-x-4 h-full">
        <span class="self-center">{{ $t('datasets.download.info') }}</span>

        <DatasetDetails :dataset-url="datasetUrl" />
        <DownloadCSV v-if="!hideCsv" :base-url="datasetUrl" />
        <DownloadJson :dataset="dataset" />
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

        <span class="self-center">{{ $t('datasets.download.info') }}</span>

        <hr />

        <DatasetDetails :dataset-url="datasetUrl" class="max-w-full" />
        <div class="flex gap-3">
          <DownloadCSV
            v-if="!hideCsv"
            :base-url="datasetUrl"
            class="w-full max-w-full"
          />
          <DownloadJson :dataset="dataset" class="w-full max-w-full" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import { Dialog, DialogOverlay } from '@headlessui/vue';
import ArrowUp from '../svg/ArrowUp.vue';
import IconClose from '../svg/IconClose.vue';
import DownloadJson from './DownloadJson.vue';
import DatasetDetails from './DatasetDetails.vue';
import DownloadCSV from './DownloadCSV.vue';

export default defineComponent({
  components: {
    DownloadCSV,
    DatasetDetails,
    DownloadJson,
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
    hideCsv: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    let dialogOpen = ref<boolean>(false);

    function closeDialog() {
      dialogOpen.value = false;
    }

    function openDialog() {
      dialogOpen.value = true;
    }

    return {
      dialogOpen,
      openDialog,
      closeDialog,
    };
  },
});
</script>
