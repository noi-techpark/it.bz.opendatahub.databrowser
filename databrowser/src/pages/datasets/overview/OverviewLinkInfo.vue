<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <ButtonLink
    :size="Size.xm2col"
    :to="datasetOverviewForId(props.dataset.id).value"
    :data-test="`dataset-table-link-${dataset.id}`"
    class="uppercase"
  >
    <IconReadMore />
    {{ t('overview.cardItem.accessTableInfo') }}
  </ButtonLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import { Size } from '../../../components/button/types';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import { computed, toRefs } from 'vue';
import IconReadMore from '../../../components/svg/IconReadMore.vue';
import { usePaths } from '../../../domain/datasets/ui/header/usePaths';

const { t } = useI18n();
const { datasetOverviewForId } = usePaths();

const props = defineProps<{ dataset: TourismMetaData }>();
const { dataset } = toRefs(props);
</script>
