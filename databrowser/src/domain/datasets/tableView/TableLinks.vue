<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="grid grid-cols-2 gap-2">
    <DetailsLink
      v-if="showQuick"
      :to="quickLink?.route"
      :title="t('datasets.listView.viewLinks.quick.title')"
      data-test="dataset-quick-link"
    >
      <IconLayer class="grow stroke-current" />
      <span class="text-3xs uppercase">{{
        t('datasets.listView.viewLinks.quick.short')
      }}</span>
    </DetailsLink>
    <DetailsLink
      :to="detailLink?.route"
      :title="t('datasets.listView.viewLinks.detail.title')"
      data-test="dataset-detail-link"
    >
      <IconEye class="grow stroke-current" />
      <span class="text-3xs uppercase">{{
        t('datasets.listView.viewLinks.detail.short')
      }}</span>
    </DetailsLink>
    <DetailsLink
      v-if="showEdit"
      :to="editLink?.route"
      :title="t('datasets.listView.viewLinks.edit.title')"
      data-test="dataset-edit-link"
    >
      <IconEdit class="grow stroke-current" />
      <span class="text-3xs uppercase">{{
        t('datasets.listView.viewLinks.edit.short')
      }}</span>
    </DetailsLink>
    <DetailsLink
      :to="rawLink?.route"
      :title="t('datasets.listView.viewLinks.raw.title')"
      data-test="dataset-raw-link"
    >
      <IconCode class="grow stroke-current" />
      <span class="text-3xs uppercase">{{
        t('datasets.listView.viewLinks.raw.short')
      }}</span>
    </DetailsLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DetailsLink from './DetailsLink.vue';
import IconLayer from '../../../components/svg/IconLayer.vue';
import IconEdit from '../../../components/svg/IconEdit.vue';
import IconCode from '../../../components/svg/IconCode.vue';
import IconEye from '../../../components/svg/IconEye.vue';
import { useDatasetRouteLinks } from '../../data/navigation/useNavigationUrls';
import { storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { toRefs } from 'vue';

const { t } = useI18n();

const props = defineProps<{
  row: unknown;
  showEdit: boolean;
  showQuick: boolean;
}>();

const { row } = toRefs(props);

const { datasetDomain, datasetPath, datasetQuery } = storeToRefs(
  useDatasetInfoStore()
);
const { detailLink, editLink, rawLink, quickLink } = useDatasetRouteLinks(
  datasetDomain,
  datasetPath,
  datasetQuery,
  row
);
</script>
