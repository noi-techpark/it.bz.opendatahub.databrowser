<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CardIconGrid>
    <IconAvailibilityOfData class="mt-0.5" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">
        {{ t('overview.info.dataAvailability.availability') }}
      </span>
      <OverviewTagAccess :dataset="dataset" />
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import IconAvailibilityOfData from '../../../components/svg/IconAvailibilityOfData.vue';
import { useI18n } from 'vue-i18n';
import OverviewTagAccess from './OverviewTagAccess.vue';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
