<template>
  <DownloadCell>
    <DownloadTitle>JSON</DownloadTitle>
    <DownloadLink :download="filename" :url="url">
      <IconDownload />
      <span class="sr-only">{{ $t('datasets.download.downloadJSON') }}</span>
    </DownloadLink>
  </DownloadCell>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadLink from './DownloadLink.vue';
import IconDownload from '../svg/IconDownload.vue';
import { computed } from 'vue';

export default defineComponent({
  components: { IconDownload, DownloadLink, DownloadTitle, DownloadCell },
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    filename: {
      type: String,
      default: 'dataset.json',
    },
  },
  setup(props) {
    const url = computed(() => {
      return `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(props.dataset)
      )}`;
    });

    return {
      url,
    };
  },
});
</script>
