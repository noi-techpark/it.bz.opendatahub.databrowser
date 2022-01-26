<template>
  <DownloadCell>
    <DownloadTitle>CSV</DownloadTitle>
    <DownloadLink :download="filename" :url="url">
      <IconDownload />
      <span class="sr-only">{{ $t('datasets.download.downloadCSV') }}</span>
    </DownloadLink>
  </DownloadCell>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadLink from './DownloadLink.vue';
import IconDownload from '../svg/IconDownload.vue';

const props = withDefaults(
  defineProps<{
    baseUrl: string;
    filename?: string;
  }>(),
  {
    filename: 'dataset.csv',
  }
);

const searchParams = new URLSearchParams(props.baseUrl);
searchParams.set('format', 'csv');
const url = decodeURIComponent(searchParams.toString());
</script>
