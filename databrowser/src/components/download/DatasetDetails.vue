<template>
  <DownloadCell class="w-full">
    <div class="inline-flex flex-col justify-center">
      <DownloadTitle>{{ $t('datasets.download.copyTitle') }}</DownloadTitle>
      <DownloadDescription>{{ datasetUrl }}</DownloadDescription>
    </div>
    <DownloadButton @clicked="copyToClipboard">
      <IconCopy />
      <span class="sr-only">Copy dataset url to the clipboard</span>
    </DownloadButton>
  </DownloadCell>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadDescription from './DownloadDescription.vue';
import DownloadButton from './DownloadButton.vue';
import IconCopy from '../svg/IconCopy.vue';

export default defineComponent({
  components: {
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
    function copyToClipboard() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.datasetUrl);
      }
    }

    return { copyToClipboard };
  },
});
</script>
