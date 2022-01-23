<template>
  <DownloadCell class="w-full">
    <div class="inline-flex flex-col justify-center">
      <DownloadTitle>{{ $t('datasets.download.copyTitle') }}</DownloadTitle>
      <DownloadDescription>{{ datasetUrl }}</DownloadDescription>
    </div>
    <DownloadButton
      title="Copy dataset url to the clipboard"
      @clicked="copyToClipboard"
    >
      <IconCheck v-if="showOk" />
      <IconCopy v-else />
      <span class="sr-only">{{ $t('datasets.download.copyAction') }}</span>
    </DownloadButton>
  </DownloadCell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import DownloadCell from './DownloadCell.vue';
import DownloadTitle from './DownloadTitle.vue';
import DownloadDescription from './DownloadDescription.vue';
import DownloadButton from './DownloadButton.vue';
import IconCopy from '../svg/IconCopy.vue';
import { ref } from 'vue';
import IconCheck from '../svg/IconCheck.vue';

const props = defineProps<{
  datasetUrl: string;
}>();

const showOk = ref<boolean>(false);

const confirmCopy = () => {
  showOk.value = true;

  setTimeout(() => (showOk.value = false), 1000);
};

const copyToClipboard = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(props.datasetUrl);
    confirmCopy();
  }
};
</script>
