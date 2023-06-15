<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <HeroContainer v-if="dataset">
    <OverviewToListLink />
    <HeroTitle>
      <DatasetTitle :dataset="dataset" />
    </HeroTitle>
    <HeroSubTitle class="lg:mt-3">
      {{ t('overview.hero.details') }}
    </HeroSubTitle>
    <div
      class="mt-4 grid w-full grid-cols-2 gap-4 rounded bg-white p-5 md:grid-cols-4 md:gap-16"
    >
      <OverviewInfoSources :dataset="dataset" />
      <OverviewInfoDataAvailability :dataset="dataset" />
      <OverviewInfoRecordCount :dataset="dataset" />
    </div>
  </HeroContainer>
</template>

<script setup lang="ts">
import HeroContainer from '../../../components/hero/HeroContainer.vue';
import HeroTitle from '../../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../../components/hero/HeroSubTitle.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import DatasetTitle from '../../../domain/datasets/common/DatasetTitle.vue';
import OverviewInfoSources from './OverviewInfoSources.vue';
import OverviewInfoDataAvailability from './OverviewInfoDataAvailability.vue';
import OverviewInfoRecordCount from './OverviewInfoRecordCount.vue';
import { useI18n } from 'vue-i18n';
import OverviewToListLink from './OverviewToListLink.vue';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
