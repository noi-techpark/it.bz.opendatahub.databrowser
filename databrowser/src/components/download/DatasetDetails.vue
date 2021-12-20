<template>
  <DownloadCell class="w-full">
    <div class="inline-flex flex-col justify-center">
      <DownloadTitle>API DATASET</DownloadTitle>
      <DownloadDescription>{{ datasetUrl }}</DownloadDescription>
    </div>
    <DownloadButton @clicked="copyToClipboard">
      <IconCopy />
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
