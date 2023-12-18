<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="grid grid-cols-2 gap-2">
    <DetailsLink
      v-if="showQuick"
      :to="quickLocation"
      :title="t('datasets.listView.viewLinks.quick.title')"
      data-test="dataset-quick-link"
    >
      <IconLayer class="grow stroke-current" />
      <span class="text-3xs uppercase">
        {{ t('datasets.listView.viewLinks.quick.short') }}
      </span>
    </DetailsLink>
    <DetailsLink
      :to="detailLocation"
      :title="t('datasets.listView.viewLinks.detail.title')"
      data-test="dataset-detail-link"
    >
      <IconEye class="grow stroke-current" />
      <span class="text-3xs uppercase">
        {{ t('datasets.listView.viewLinks.detail.short') }}
      </span>
    </DetailsLink>
    <DetailsLink
      v-if="showEdit"
      :to="editLocation"
      :title="t('datasets.listView.viewLinks.edit.title')"
      data-test="dataset-edit-link"
    >
      <IconEdit class="grow stroke-current" />
      <span class="text-3xs uppercase">
        {{ t('datasets.listView.viewLinks.edit.short') }}
      </span>
    </DetailsLink>
    <DetailsLink
      :to="rawLocation"
      :title="t('datasets.listView.viewLinks.raw.title')"
      data-test="dataset-raw-link"
    >
      <IconCode class="grow stroke-current" />
      <span class="text-3xs uppercase">
        {{ t('datasets.listView.viewLinks.raw.short') }}
      </span>
    </DetailsLink>
    <DetailsLink
      v-if="showDelete"
      :title="t('datasets.listView.viewLinks.delete.title')"
      data-test="dataset-delete-link"
      @click="onDelete()"
    >
      <IconCloseCircled class="h-4/5 grow stroke-red-500" />
      <span class="text-3xs uppercase text-red-500">{{
        t('datasets.listView.viewLinks.delete.short')
      }}</span>
    </DetailsLink>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import IconCode from '../../../../components/svg/IconCode.vue';
import IconEdit from '../../../../components/svg/IconEdit.vue';
import IconEye from '../../../../components/svg/IconEye.vue';
import IconLayer from '../../../../components/svg/IconLayer.vue';
import IconCloseCircled from '../../../../components/svg/IconCloseCircled.vue';
import { RecordId } from '../../../datasets/types';
import { useDatasetBaseInfoStore } from '../../config/store/datasetBaseInfoStore';
import { useSingleRecordLocations } from '../../location/datasetViewLocation';
import DetailsLink from './DetailsLink.vue';
import { useEventDelete } from './utils';

const { t } = useI18n();

const props = defineProps<{
  recordId: RecordId;
  showEdit: boolean;
  showQuick: boolean;
  showDelete: boolean;
}>();

const { recordId } = toRefs(props);

const { datasetDomain, datasetPath, datasetQuery } = storeToRefs(
  useDatasetBaseInfoStore()
);

const { detailLocation, editLocation, rawLocation, quickLocation } =
  useSingleRecordLocations(datasetDomain, datasetPath, datasetQuery, recordId);

const onDelete = () => {
  useEventDelete.emit(recordId.value);
};
</script>
