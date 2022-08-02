<template>
  <header class="flex flex-wrap items-center py-2 text-xs md:py-3">
    <!-- Dataset title -->
    <div
      class="flex justify-between items-center mb-2 w-full md:mb-0 md:w-auto"
    >
      <span
        v-if="datasetConfigStore.hasConfig"
        class="mr-1 text-sm font-bold text-black md:w-auto md:text-base"
      >
        {{ datasetConfigStore.config?.description?.title }}
      </span>
      <span v-else class="mr-3 text-base">
        No view config found, try to change the view using the provided button
      </span>
      <AddRecordButton v-if="showAddRecord" class="md:hidden" />
    </div>

    <!-- More info -->
    <ButtonCustom
      v-if="datasetConfigStore.hasConfig"
      variant="ghost"
      size="xs"
      class="flex items-center py-1 px-3 mr-1 h-6"
    >
      <IconInfo class="mr-2 stroke-current" />
      <span class="line-height-1">{{ t('datasets.header.moreInfo') }}</span>
    </ButtonCustom>

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
    <div
      v-if="
        picked === 'generated' ||
        datasetConfigStore.config?.source === 'generated'
      "
      class="flex items-center py-1 px-3 ml-1 text-[#AA5B00] bg-[#FDF2E6] rounded"
    >
      <span
        class="inline-block mr-1 w-1 h-1 bg-current rounded-full dot"
      ></span>
      <span>{{ t('datasets.header.viewGeneratedConfig') }}</span>
    </div>

    <div class="flex ml-auto">
      <AddRecordButton v-if="showAddRecord" class="hidden mr-3 md:block" />

      <!-- Language picker -->
      <LanguagePicker />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconInfo from '../../../components/svg/IconInfo.vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import { useI18n } from 'vue-i18n';
import AddRecordButton from './AddRecordButton.vue';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { SourceType } from '../../datasetConfig/source/types';

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
    datasetConfigStore.hasCreatePermission
);
</script>
