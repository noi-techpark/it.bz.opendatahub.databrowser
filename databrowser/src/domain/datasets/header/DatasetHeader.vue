<template>
  <header class="flex flex-wrap items-center py-2 text-xs md:py-3">
    <!-- Dataset title -->
    <div
      class="flex justify-between items-center mb-2 w-full md:mb-0 md:w-auto"
    >
      <span
        v-if="viewConfig"
        class="mr-1 text-sm font-bold text-black md:w-auto md:text-base"
      >
        {{ viewConfig?.description?.title }}
      </span>
      <span v-else class="mr-3 text-base">
        No view config found, try to change the view using the provided button
      </span>
      <AddRecordButton class="md:hidden" />
    </div>

    <!-- More info -->
    <ButtonCustom
      v-if="viewConfig"
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
        'animate-pulse outline rounded outline-green-500': !viewConfig,
      }"
      @picked-change="setViewConfigSource"
      @column-width-change="columnWidth = $event"
    />

    <!-- Show information if current view is auto generated -->
    <div
      v-if="picked === 'generated' || viewConfig?.source === 'generated'"
      class="flex items-center py-1 px-3 ml-1 text-[#AA5B00] bg-[#FDF2E6] rounded"
    >
      <span
        class="inline-block mr-1 w-1 h-1 bg-current rounded-full dot"
      ></span>
      <span>{{ t('datasets.header.viewGeneratedConfig') }}</span>
    </div>

    <div class="flex ml-auto">
      <AddRecordButton class="hidden mr-3 md:block" />

      <!-- Language picker -->
      <LanguagePicker />
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import { ViewConfig } from '../../viewConfig/types';
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconInfo from '../../../components/svg/IconInfo.vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import { useViewConfigProvider } from '../../viewConfig';
import { useI18n } from 'vue-i18n';
import AddRecordButton from './AddRecordButton.vue';

const { t } = useI18n();

const props = defineProps<{ viewConfig?: ViewConfig }>();
const { viewConfig } = toRefs(props);

const viewConfigProvider = useViewConfigProvider();

const picked = ref<string>(viewConfigProvider.currentSource.value ?? '');
const columnWidth = ref<string>('');

const setViewConfigSource = (source: string) => {
  picked.value = source;
  viewConfigProvider.currentSource.value = source;
};
</script>
