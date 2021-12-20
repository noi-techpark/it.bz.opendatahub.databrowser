<template>
  <DownloadCell class="w-full">
    <div class="inline-flex flex-col justify-center">
      <DownloadTitle>{{ $t('datasets.download.copyTitle') }}</DownloadTitle>
      <DownloadDescription>{{ datasetUrl }}</DownloadDescription>
    </div>
    <DownloadButton @clicked="copyToClipboard">
      <IconCheck v-if="showOk" />
      <IconCopy v-else />
      <span class="sr-only">Copy dataset url to the clipboard</span>
    </DownloadButton>
  </DownloadCell>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadDescription from './DownloadDescription.vue';
import DownloadButton from './DownloadButton.vue';
import IconCopy from '../svg/IconCopy.vue';
import { ref } from 'vue';
import IconCheck from '../svg/IconCheck.vue';

export default defineComponent({
  components: {
    IconCheck,
    IconCopy,
    DownloadButton,
    DownloadDescription,
    DownloadTitle,
    DownloadCell,
  },
  props: {
    datasetUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const showOk = ref<boolean>(false);

    function confirmCopy() {
      showOk.value = true;

      setTimeout(() => (showOk.value = false), 1000);
    }

    function copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.datasetUrl);
        confirmCopy();
      }
    }

    return { copyToClipboard, showOk };
  },
});
</script>
