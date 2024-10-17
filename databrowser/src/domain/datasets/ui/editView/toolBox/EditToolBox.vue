<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBox
    :tab-names="[
      t('datasets.editView.toolBox.editHints.panelName'),
      t('datasets.editView.toolBox.jsonDiff.panelName'),
    ]"
    :open-tool-box-button-label="t('datasets.toolBox.button.openToolBox')"
    :close-tool-box-button-label="t('datasets.toolBox.button.closeToolBox')"
  >
    <EditHintsAndSettingsToolBoxPanel />
    <JsonDiffToolBoxPanel />
  </ToolBox>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ToolBox from '../../toolBox/ToolBox.vue';
import EditHintsAndSettingsToolBoxPanel from './EditHintsAndSettingsToolBoxPanel.vue';
import JsonDiffToolBoxPanel from './JsonDiffToolBoxPanel.vue';

const { t } = useI18n();
</script>
