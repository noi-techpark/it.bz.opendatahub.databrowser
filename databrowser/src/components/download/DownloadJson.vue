<template>
  <DownloadCell>
    <DownloadTitle>JSON</DownloadTitle>
    <DownloadLink :download="filename" :url="url">
      <IconDownload />
      <span class="sr-only">{{ $t('datasets.download.downloadJSON') }}</span>
    </DownloadLink>
  </DownloadCell>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadLink from './DownloadLink.vue';
import IconDownload from '../svg/IconDownload.vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    dataset: unknown;
    filename?: string;
  }>(),
  {
    filename: 'dataset.json',
  }
);

const url = computed(() => {
  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(props.dataset)
  )}`;
});
</script>
