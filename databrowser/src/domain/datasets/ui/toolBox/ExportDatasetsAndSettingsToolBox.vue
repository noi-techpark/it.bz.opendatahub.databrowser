<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBox
    :tab-names="[
      t('datasets.toolBox.exportDatasets.panelName'),
      t('datasets.toolBox.exportDatasets.settings'),
    ]"
    is-white
    hide-expand-on-desktop
  >
    <ExportDatasetsToolBoxPanel :url="url" :references-urls="referencesUrls" />
    <SettingsToolBoxPanel />
  </ToolBox>
</template>

<script setup lang="ts">
import ToolBox from './ToolBox.vue';
import ExportDatasetsToolBoxPanel from './ExportDatasetsToolBoxPanel.vue';
import SettingsToolBoxPanel from './SettingsToolBoxPanel.vue';
import { useI18n } from 'vue-i18n';
import { ReferenceInfoToolBoxFetchUrlInfo } from '../../config/types';

const { t } = useI18n();

defineProps<{
  url?: string;
  referencesUrls?: ReferenceInfoToolBoxFetchUrlInfo[];
}>();
</script>
