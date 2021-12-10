<template>
  <div class="mx-auto max-w-5xl">
    <div class="hidden lg:flex items-stretch space-x-4 h-full">
      <span class="self-center">Retrieve data based on table settings</span>
      <DownloadCell>
        <span class="font-semibold">API DATASET</span>
        <span class="font-mono text-sm"
          >https://api.datahub.curlpi.datahub.com/v1/charges/ch_/istchat/juati/ch_3Juaty2eZvKYlo2C0
          atahub</span
        >
      </DownloadCell>
      <DownloadCell>
        <span class="font-semibold whitespace-nowrap">CSV</span>
      </DownloadCell>
      <DownloadCell>
        <span class="font-semibold whitespace-nowrap">JSON</span>
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
import DownloadCell from './DownloadCell.vue';
import ArrowUp from '../svg/ArrowUp.vue';

export default {
  components: { ArrowUp, DownloadCell },
};
</script>
