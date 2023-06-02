<template>
  <header class="flex flex-wrap items-center py-2 text-xs md:py-3">
    <!-- Dataset title -->
    <div
      class="mb-2 flex w-full items-center justify-between md:mb-0 md:w-auto"
    >
      <span
        v-if="datasetConfigStore.hasConfig"
        class="mr-1 text-sm font-bold text-black md:w-auto md:text-base"
      >
        <DatasetHeaderTitle />
      </span>
      <span v-else class="mr-3 text-base">
        {{ t('datasets.header.noViewConfig') }}
      </span>
      <AddRecordButton
        v-if="showAddRecord"
        class="md:hidden"
        data-test="mobile-add-record-link"
      />
    </div>

    <!-- More info -->
    <DatasetHeaderMoreInfoPopup />

    <!-- Popup -->
    <DatasetHeaderConfigPopup
      :picked="picked"
      :column-width="columnWidth"
      :class="{
        'animate-pulse outline rounded outline-green-500':
          !datasetConfigStore.hasConfig,
      }"
      @picked-change="setDatasetConfigSource"
      @column-width-change="columnWidth = $event"
    />

    <!-- Show information if current view is auto generated -->
    <TagCustom
      v-if="
        picked === 'generated' ||
        datasetConfigStore.config?.source === 'generated'
      "
      :text="t('datasets.header.viewGeneratedConfig')"
      class="ml-1"
      size="xs"
      type="yellow"
      has-dot
    />

    <div class="ml-auto flex">
      <AddRecordButton
        v-if="showAddRecord"
        class="mr-3 hidden md:block"
        data-test="desktop-add-record-link"
      />

      <!-- Language picker -->
      <LanguagePicker />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import { useI18n } from 'vue-i18n';
import AddRecordButton from './AddRecordButton.vue';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { SourceType } from '../../datasetConfig/source/types';
import TagCustom from '../../../components/tag/TagCustom.vue';
import DatasetHeaderMoreInfoPopup from './DatasetHeaderMoreInfoPopup.vue';
import DatasetHeaderTitle from './DatasetHeaderTitle.vue';

const { t } = useI18n();

const datasetConfigStore = useDatasetConfigStore();

const picked = ref<string>(datasetConfigStore.source ?? '');
const columnWidth = ref<string>('');

const setDatasetConfigSource = (source: SourceType) => {
  picked.value = source;
  datasetConfigStore.changeSource(source);
};

const showAddRecord = computed(
  () =>
    !datasetConfigStore.isSourceGenerated &&
    datasetConfigStore.hasCreatePermission &&
    datasetConfigStore.hasNewView
);
</script>
