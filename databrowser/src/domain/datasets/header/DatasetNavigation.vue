<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div class="bg-gray-50 text-sm">
    <div class="overflow-x-auto whitespace-nowrap">
      <ContentAlignmentX class="flex items-center">
        <ButtonLink
          variant="ghost"
          size="xs"
          class="mr-2 flex h-6 items-center bg-white px-3 py-1 md:mr-9"
          :to="combinedTableViewPath"
          data-test="table-view-link"
        >
          <IconStrokedArrowDown
            class="-ml-1 mr-1 h-5 w-5 rotate-90 stroke-current"
          />
          <span class="line-height-1">
            {{ t('datasets.navigation.tableView') }}
          </span>
        </ButtonLink>

        <TabLink
          v-if="isNewView && newLocation"
          :label="t('datasets.navigation.newView')"
          :to="newLocation"
          :active="true"
          data-test="new-view-link"
        ></TabLink>

        <TabLink
          v-if="!isNewView && hasQuickView && quickLocation"
          :label="t('datasets.navigation.quickView')"
          :to="quickLocation"
          :active="isQuickView"
          data-test="quick-view-link"
        />
        <TabLink
          v-if="!isNewView && hasDetailView && detailLocation"
          :label="t('datasets.navigation.detailView')"
          :to="detailLocation"
          :active="isDetailView"
          data-test="detail-view-link"
        />
        <TabLink
          v-if="
            !isNewView && hasEditView && editRecordSupported && editLocation
          "
          :label="t('datasets.navigation.editView')"
          :to="editLocation"
          :active="isEditView"
          data-test="edit-view-link"
        />
        <TabLink
          v-if="!isNewView && rawLocation"
          :label="t('datasets.navigation.rawView')"
          :to="rawLocation"
          :active="isRawView"
          data-test="raw-view-link"
        />
      </ContentAlignmentX>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import TabLink from '../../../components/tab/TabLink.vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useTableViewRouteQueryStore } from '../tableView/tableViewRouteQueryStore';
import { storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../datasetConfig/store/datasetInfoStore';
import { useDatasetLocations } from '../location/datasetLocation';
import { useDataStore } from '../../data/load/useDataStore';

const { t } = useI18n();

const {
  hasDetailView,
  hasEditView,
  hasQuickView,
  isDetailView,
  isEditView,
  isNewView,
  isRawView,
  isQuickView,
  editRecordSupported,
  datasetDomain,
  datasetPath,
  datasetQuery,
} = storeToRefs(useDatasetInfoStore());

const { data } = storeToRefs(useDataStore());

const {
  tableLocation,
  detailLocation,
  editLocation,
  newLocation,
  rawLocation,
  quickLocation,
} = useDatasetLocations(datasetDomain, datasetPath, datasetQuery, data);

// Combine query params from TableView with ones from the current route.
// This is needed to keep the query params when switching between DetailView
// and TableView.
const { routeQuery } = useTableViewRouteQueryStore();
const combinedTableViewPath = computed(() => {
  const tableLocationValue = tableLocation?.value ?? {};
  return {
    ...tableLocationValue,
    query: {
      ...routeQuery,
      ...(tableLocationValue.query ?? {}),
    },
  };
});
</script>
