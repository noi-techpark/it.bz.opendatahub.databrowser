<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <TagCustom
      v-if="dataset.access === 'opendata'"
      size="xs"
      type="blue"
      :text="t('overview.info.dataAvailability.accessFull')"
      has-dot
    />
    <TagCustom
      v-if="dataset.access === 'limited' || dataset.access === 'closed'"
      size="xs"
      type="yellow"
      :text="t('overview.info.dataAvailability.accessLimited')"
      has-dot
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import TagCustom from '../../../components/tag/TagCustom.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
