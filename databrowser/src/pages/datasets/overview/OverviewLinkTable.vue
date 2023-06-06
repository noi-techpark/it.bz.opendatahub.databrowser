<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonLink
    :size="Size.xm2col"
    :to="{
      name: DatasetPage.TABLE,
      params: {
        domain: 'tourism',
        pathParams: dataset.pathParam,
      },
      query: dataset.apiFilter,
    }"
    :data-test="`dataset-table-link-${dataset.id}`"
  >
    <IconTable />
    {{ t('overview.cardItem.accessTableView') }}
  </ButtonLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { Size } from '../../../components/button/types';
import IconTable from '../../../components/svg/IconTable.vue';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import { DatasetPage } from '../../../routes';

const { t } = useI18n();

defineProps<{ dataset: TourismMetaData }>();
</script>
