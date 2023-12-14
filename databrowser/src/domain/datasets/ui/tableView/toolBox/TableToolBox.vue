<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ToolBox
    :visible="false"
    :tab-names="[
      t('datasets.listView.toolBox.searchAndFilter.panelName'),
      t('datasets.toolBox.exportDatasets.panelName'),
    ]"
  >
    <SearchAndFilterToolBoxPanel :filter-options="filterOptions" />
    <ExportDatasetsToolBoxPanel :url="url" />
  </ToolBox>
  <div></div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { SelectOption } from '../../../../../components/select/types';
import ExportDatasetsToolBoxPanel from '../../toolBox/ExportDatasetsToolBoxPanel.vue';
import ToolBox from '../../toolBox/ToolBox.vue';
import { Column } from '../types';
import SearchAndFilterToolBoxPanel from './SearchAndFilterToolBoxPanel.vue';

const { t } = useI18n();

const props = defineProps<{ url?: string; cols: Column[] }>();
const { cols } = toRefs(props);

const filterOptions = computed(() =>
  cols.value.map<SelectOption>((col) => ({
    label: col.title,
    value: col.firstPropertyPath,
  }))
);
</script>
