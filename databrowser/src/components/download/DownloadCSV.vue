<template>
  <DownloadCell>
    <DownloadTitle>CSV</DownloadTitle>
    <DownloadLink :download="filename" :url="url">
      <IconDownload />
      <span class="sr-only">{{ $t('datasets.download.downloadCSV') }}</span>
    </DownloadLink>
  </DownloadCell>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadLink from './DownloadLink.vue';
import IconDownload from '../svg/IconDownload.vue';

export default defineComponent({
  components: { IconDownload, DownloadLink, DownloadTitle, DownloadCell },
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      default: 'dataset.csv',
    },
  },
  setup(props) {
    const searchParams = new URLSearchParams(props.baseUrl);
    searchParams.set('format', 'csv');
    const url = decodeURIComponent(searchParams.toString());

    return {
      url,
    };
  },
});
</script>
