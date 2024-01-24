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
  >
    <EditHintsToolBoxPanel />
    <JsonDiffToolBoxPanel />
  </ToolBox>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ToolBox from '../../toolBox/ToolBox.vue';
import EditHintsToolBoxPanel from './EditHintsToolBoxPanel.vue';
import JsonDiffToolBoxPanel from './JsonDiffToolBoxPanel.vue';

const { t } = useI18n();
</script>
