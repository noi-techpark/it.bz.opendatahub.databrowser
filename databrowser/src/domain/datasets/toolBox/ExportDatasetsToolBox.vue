<template>
  <ToolBox :tab-names="[t('datasets.toolBox.exportDatasets.panelName')]">
    <ExportDatasetsToolBoxPanel :url="url" />
  </ToolBox>
</template>

<script setup lang="ts">
import ToolBox from './ToolBox.vue';
import ExportDatasetsToolBoxPanel from './ExportDatasetsToolBoxPanel.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ url: string }>();
</script>
