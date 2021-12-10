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
      <button class="p-3 rounded-full border">
        <ArrowUp />
      </button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import ArrowUp from '../svg/ArrowUp.vue';
import IconCopy from '../svg/IconCopy.vue';
import IconDownload from '../svg/IconDownload.vue';

export default defineComponent({
  components: { IconDownload, IconCopy, ArrowUp, DownloadCell },
  props: {
    dataset: {
      type: String,
      required: true,
    },
  },
  emits: ['downloadCsv', 'downloadJson'],
  setup(props) {
    function copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.dataset);
      }
    }

    return {
      copyToClipboard,
    };
  },
});
</script>
