<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBoxPanel>
    <ToolBoxSectionLabel>{{
      t('datasets.toolBox.exportDatasets.sectionRetrieveData')
    }}</ToolBoxSectionLabel>
    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.toolBox.exportDatasets.apiDatasets.header') }}
        <ToolBoxCardHeaderButton
          :aria-label="t('datasets.toolBox.exportDatasets.apiDatasets.iconAlt')"
          @icon-click="copyUrl"
        >
          <IconCopy v-if="!copiedUrl" />
          <IconCheck v-else />
        </ToolBoxCardHeaderButton>
      </ToolBoxCardHeader>
      <ToolBoxCardBody :with-bg-color="true" class="break-all">{{
        url
      }}</ToolBoxCardBody>
    </ToolBoxCard>

    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.toolBox.exportDatasets.json.header') }}
        <ToolBoxCardHeaderButton
          :aria-label="t('datasets.toolBox.exportDatasets.json.iconAlt')"
          @icon-click="downloadData"
        >
          <IconDownload />
        </ToolBoxCardHeaderButton>
      </ToolBoxCardHeader>
      <ToolBoxCardBody :with-bg-color="true">{{
        t('datasets.toolBox.exportDatasets.json.body')
      }}</ToolBoxCardBody>
    </ToolBoxCard>

    <ToolBoxSectionLabel>{{
      t('datasets.toolBox.exportDatasets.sectionFurtherDetails')
    }}</ToolBoxSectionLabel>

    <ToolBoxCard>
      <ToolBoxCardHeader>
        {{ t('datasets.toolBox.exportDatasets.documentation.header') }}
        <a
          href="https://opendatahub.readthedocs.io/en/latest/index.html"
          target="_blank"
          class="rounded"
          :aria-label="
            t('datasets.toolBox.exportDatasets.documentation.iconAlt')
          "
        >
          <IconLink class="text-green-500" />
        </a>
      </ToolBoxCardHeader>
      <ToolBoxCardBody :with-bg-color="true">{{
        t('datasets.toolBox.exportDatasets.documentation.body')
      }}</ToolBoxCardBody>
    </ToolBoxCard>
  </ToolBoxPanel>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import IconCheck from '../../../components/svg/IconCheck.vue';
import IconCopy from '../../../components/svg/IconCopy.vue';
import IconDownload from '../../../components/svg/IconDownload.vue';
import IconLink from '../../../components/svg/IconLink.vue';
import { useAxiosFileDownloader } from '../../api';
import ToolBoxCard from './ToolBoxCard.vue';
import ToolBoxCardBody from './ToolBoxCardBody.vue';
import ToolBoxCardHeader from './ToolBoxCardHeader.vue';
import ToolBoxCardHeaderButton from './ToolBoxCardHeaderButton.vue';
import ToolBoxPanel from './ToolBoxPanel.vue';
import ToolBoxSectionLabel from './ToolBoxSectionLabel.vue';

const { t } = useI18n();

const props = defineProps<{ url: string }>();

const { copy: copyUrl, copied: copiedUrl } = useClipboard({
  source: props.url,
});

const fileDownloader = useAxiosFileDownloader();
const downloadData = async () => fileDownloader.download(props.url);
</script>
