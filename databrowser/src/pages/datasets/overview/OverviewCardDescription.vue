<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <CardContainer>
    <CardTitle>
      {{ t('overview.cardDescription.description') }}
    </CardTitle>
    <CardText>{{ dataset.description }}</CardText>
  </CardContainer>
</template>

<script setup lang="ts">
import CardContainer from '../../../components/card/CardContainer.vue';
import CardTitle from '../../../components/card/CardTitle.vue';
import CardText from '../../../components/card/CardText.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
