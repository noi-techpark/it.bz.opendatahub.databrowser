<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <header class="flex flex-wrap items-center py-2 text-xs md:py-3">
    <!-- Dataset title -->
    <div
      class="mb-2 flex w-full items-center justify-between md:mb-0 md:w-auto"
    >
      <span
        v-if="hasConfig"
        class="mr-1 text-sm font-bold text-black md:w-auto md:text-base"
      >
        <DatasetHeaderTitle />
      </span>
      <span v-else class="mr-3 text-base">
        {{ t('datasets.header.noViewConfig') }}
      </span>
      <AddRecordButton
        v-if="addRecordSupported"
        class="md:hidden"
        data-test="mobile-add-record-link"
      />
    </div>

    <!-- More info -->
    <DatasetHeaderMoreInfoPopup />

    <!-- Popup -->
    <DatasetHeaderConfigPopup
      :picked="source"
      :class="{
        'animate-pulse rounded outline outline-green-500': !hasConfig,
      }"
      @picked-change="changeSource($event)"
    />

    <!-- Show information if current view is auto generated -->
    <TagCustom
      v-if="source === 'generated'"
      :text="t('datasets.header.viewGeneratedConfig')"
      class="ml-1"
      size="xs"
      type="yellow"
      has-dot
    />

    <div class="ml-auto flex">
      <AddRecordButton
        v-if="addRecordSupported"
        class="mr-3 hidden md:block"
        data-test="desktop-add-record-link"
      />

      <!-- Language picker -->
      <LanguagePicker
        v-if="showLanguagePicker"
        :current-language="currentLanguage"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguagePicker from '../../../components/language/LanguagePicker.vue';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { DatasetConfigSource } from '../../datasetConfig/load/types';
import { useDatasetQueryStore } from '../../datasetConfig/store/datasetQueryStore';
import { useDatasetSourceStore } from '../../datasetConfig/store/datasetSourceStore';
import { useDatasetBaseInfoStore } from '../config/store/datasetBaseInfoStore';
import AddRecordButton from './AddRecordButton.vue';
import DatasetHeaderConfigPopup from './DatasetHeaderConfigPopup.vue';
import DatasetHeaderMoreInfoPopup from './DatasetHeaderMoreInfoPopup.vue';
import DatasetHeaderTitle from './DatasetHeaderTitle.vue';
import { useDatasetPermissionStore } from '../permission/store/datasetPermissionStore';

const { t } = useI18n();

const { datasetDomain, hasConfig } = storeToRefs(useDatasetBaseInfoStore());

const { addRecordSupported } = storeToRefs(useDatasetPermissionStore());

const currentLanguage = useDatasetQueryStore().handle('language');

const { source } = storeToRefs(useDatasetSourceStore());

const changeSource = (value: DatasetConfigSource) => {
  source.value = value;
};

const showLanguagePicker = computed(() => datasetDomain.value === 'tourism');
</script>
