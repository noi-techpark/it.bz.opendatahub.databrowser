<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CardIconGrid>
    <IconDataanalyst class="size-4" />
    <div class="flex flex-col gap-2 leading-tight text-gray-600">
      <span class="font-semibold">
        {{ t('overview.info.sources.sources') }}
      </span>
      <ListWithMore :dataset="dataset" />
    </div>
  </CardIconGrid>
</template>

<script setup lang="ts">
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import CardIconGrid from '../../../components/card/CardIconGrid.vue';
import ListWithMore from '../../../components/list/ListWithMore.vue';
import { useI18n } from 'vue-i18n';
import IconDataanalyst from '../../../components/svg/IconDataanalyst.vue';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
