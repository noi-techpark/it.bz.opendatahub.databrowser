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
        {{ title }}
      </span>
      <span v-else class="mr-3 text-base">
        No view config found, try to change the view using the provided button
      </span>
      <AddRecordButton
        v-if="showAddRecord"
        class="md:hidden"
        data-test="mobile-add-record-link"
      />
    </div>

    <!-- More info -->
    <ButtonCustom
      v-if="datasetConfigStore.hasConfig"
      variant="ghost"
      size="xs"
      class="mr-1 flex h-6 items-center py-1 px-3"
      data-test="more-info-button"
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
import ButtonCustom from '../../../components/button/ButtonCustom.vue';
import IconInfo from '../../../components/svg/IconInfo.vue';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import { useI18n } from 'vue-i18n';
import AddRecordButton from './AddRecordButton.vue';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { SourceType } from '../../datasetConfig/source/types';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { useCurrentMetaData } from '../../metaDataConfig/tourism/useCurrentMetaData';
import { useRouter } from 'vue-router';

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

const pathParams = computed(
  () => datasetConfigStore.config?.route.pathParams ?? []
);
const { currentRoute } = useRouter();
const query = computed(() => currentRoute.value.query);
const { currentMetaData } = useCurrentMetaData(pathParams, query);

const title = computed(
  () =>
    currentMetaData.value?.title ??
    datasetConfigStore.config?.description?.title ??
    'Untitled'
);
</script>
