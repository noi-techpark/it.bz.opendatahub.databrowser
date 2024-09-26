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
import { computeTableLocation } from '../../../domain/datasets/location/datasetViewLocation';

const { t } = useI18n();

const props = defineProps<{ dataset: TourismMetaData }>();
const { dataset } = toRefs(props);

const tableLocation = computed(() => {
  if (dataset.value == null || dataset.value.baseUrl == null) {
    return;
  }

  // TODO: this is a very dirty hack to determine if the domain is the tourism or mobility
  // domain. A better solution would be to have a domain property in the dataset metadata,
  // because that way we can support other domains without code changes.
  // const domain = dataset.value.baseUrl.includes('tourism')
  //   ? 'tourism'
  //   : 'mobility';

  // TODO: Dirty Hack refined, if dataspace weather is set look up to the baseUrl, todo use ApiDomain field
  const domain =
    dataset.value.dataSpace == 'weather' || dataset.value.dataSpace == 'other'
      ? dataset.value.baseUrl.includes('tourism')
        ? 'tourism'
        : 'mobility'
      : dataset.value.dataSpace;

  const { pathSegments, apiFilter } = dataset.value;

  return computeTableLocation(domain, pathSegments, apiFilter);
});
</script>
