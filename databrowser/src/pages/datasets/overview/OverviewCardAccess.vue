<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CardContainer>
    <CardTitle>{{ t('overview.cardAccess.dataAccess') }}</CardTitle>
    <div class="flex flex-wrap gap-5 md:flex-nowrap md:gap-16">
      <div class="flex w-full flex-col md:w-fit">
        <CardText>{{ t('overview.cardAccess.viewInDataBrowser') }}</CardText>
        <OverviewLinkTable :dataset="dataset" />
      </div>
      <div class="flex w-full flex-col md:w-fit">
        <CardText>
          {{ t('overview.cardAccess.accessData') }}
        </CardText>
        <OverviewLinkApi :dataset="dataset" />
      </div>
    </div>
  </CardContainer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import OverviewLinkTable from './OverviewLinkTable.vue';
import OverviewLinkApi from './OverviewLinkApi.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
