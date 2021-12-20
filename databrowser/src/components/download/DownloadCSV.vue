<template>
  <DownloadCell>
    <DownloadTitle>CSV</DownloadTitle>
    <DownloadLink :download="filename" :url="url">
      <IconDownload />
      <span class="sr-only">Download dataset as CSV</span>
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
    const url = `${props.baseUrl}?format=csv`;

    return {
      url,
    };
  },
});
</script>
