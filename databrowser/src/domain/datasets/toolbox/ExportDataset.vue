<template>
  <div>
    <ToolBoxCardHeader :margin-top="false">
      Retrieve data for this record
    </ToolBoxCardHeader>
    <ToolBoxCard label="API datasets" :break-all="true" @icon-click="copyUrl">
      <template #icon>
        <IconCopy v-if="!copiedUrl" class="text-green-500" />
        <IconCheck v-else class="text-green-500" />
      </template>
      <span>{{ url }}</span>
    </ToolBoxCard>
    <ToolBoxCard label="JSON" @icon-click="downloadData">
      <template #icon>
        <IconDownload class="text-green-500" />
      </template>
      <span>dataset.json</span>
    </ToolBoxCard>
    <ToolBoxCardHeader margin-top>Further details</ToolBoxCardHeader>
    <ToolBoxCard label="DOCUMENTATION" :margin-bottom="false">
      <template #icon>
        <a href="https://databrowser.opendatahub.bz.it/" target="_blank">
          <IconLink class="text-green-500" />
        </a>
      </template>
      <span>Check documentation for full details</span>
    </ToolBoxCard>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ToolBoxCardHeader from './ToolBoxCardHeader.vue';
import ToolBoxCard from './ToolBoxCard.vue';
import IconCopy from '../../../components/svg/IconCopy.vue';
import IconCheck from '../../../components/svg/IconCheck.vue';
import IconDownload from '../../../components/svg/IconDownload.vue';
import IconLink from '../../../components/svg/IconLink.vue';
import { useClipboard } from '@vueuse/core';
import { useAxiosFileDownloader } from '../../api/client/fetcher/axios';

const props = defineProps<{ url: string }>();

const { copy: copyUrl, copied: copiedUrl } = useClipboard({
  source: props.url,
});

const fileDownloader = useAxiosFileDownloader();
const downloadData = async () => fileDownloader.download(props.url);
</script>
