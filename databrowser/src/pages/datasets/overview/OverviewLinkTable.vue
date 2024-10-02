<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonLink
    :size="Size.xm2col"
    :to="tableLocation"
    :data-test="`dataset-table-link-${dataset.id}`"
    :disabled="tableLocation == null"
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
import { computed, toRefs } from 'vue';
import { getTableLocationFromDataset } from '../../../domain/datasets/utils';

const { t } = useI18n();

const props = defineProps<{ dataset: TourismMetaData }>();
const { dataset } = toRefs(props);

const tableLocation = computed(() =>
  getTableLocationFromDataset(dataset.value)
);
</script>
