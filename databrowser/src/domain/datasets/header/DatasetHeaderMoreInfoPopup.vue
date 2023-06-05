<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <PopoverCustom>
    <template #trigger>
      <PopoverCustomButton
        class="mr-1 flex h-6 items-center justify-center px-3"
        :class="buttonClasses"
      >
        <IconInfo class="mr-2 stroke-current" />
        <span class="line-height-1">{{ t('datasets.header.moreInfo') }}</span>
      </PopoverCustomButton>
    </template>
    <template #container>
      <PopoverCustomPanel>
        <PopoverContent class="max-w-lg">
          <div v-if="currentMetaData != null">
            <div
              class="mr-1 mb-2 text-sm font-bold text-black md:w-auto md:text-base"
            >
              <DatasetHeaderTitle />
            </div>
            <div class="mb-4">
              {{ currentMetaData.description }}
            </div>
            <div class="mb-5 flex justify-between gap-5">
              <OverviewInfoDataAvailability :dataset="currentMetaData" />
              <OverviewInfoRecordCount :dataset="currentMetaData" />
            </div>
            <ButtonLink
              :to="datasetOverviewForId(currentMetaData.id).value"
              :variant="Variant.ghost"
              class="w-full justify-center border-hint-info"
            >
              {{ t('datasets.header.datasetDetails') }}
            </ButtonLink>
          </div>
        </PopoverContent>
      </PopoverCustomPanel>
    </template>
  </PopoverCustom>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { Size, Variant } from '../../../components/button/types';
import PopoverContent from '../../../components/popover/PopoverContent.vue';
import PopoverCustom from '../../../components/popover/PopoverCustom.vue';
import PopoverCustomButton from '../../../components/popover/PopoverCustomButton.vue';
import PopoverCustomPanel from '../../../components/popover/PopoverCustomPanel.vue';
import IconInfo from '../../../components/svg/IconInfo.vue';
import OverviewInfoDataAvailability from '../../../pages/datasets/overview/OverviewInfoDataAvailability.vue';
import OverviewInfoRecordCount from '../../../pages/datasets/overview/OverviewInfoRecordCount.vue';
import { useMetaDataForCurrentRoute } from '../../metaDataConfig/tourism/useMetaData';
import { usePaths } from './usePaths';
import { computeButtonClasses } from '../../../components/button/styles';
import DatasetHeaderTitle from './DatasetHeaderTitle.vue';

const { t } = useI18n();

const buttonClasses = computeButtonClasses({
  size: Size.xs,
  variant: Variant.ghost,
});

const { currentMetaData } = useMetaDataForCurrentRoute();

const { datasetOverviewForId } = usePaths();
</script>
