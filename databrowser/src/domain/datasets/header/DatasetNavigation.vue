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
          v-if="isNewView"
          :label="t('datasets.navigation.newView')"
          :to="newLocation"
          :active="true"
          data-test="new-view-link"
        ></TabLink>
        <TabLink
          v-if="!isNewView && hasQuickView"
          :label="t('datasets.navigation.quickView')"
          :to="quickLocation"
          :active="isQuickView"
          data-test="quick-view-link"
        />
        <TabLink
          v-if="!isNewView && hasDetailView"
          :label="t('datasets.navigation.detailView')"
          :to="{ ...detailLocation, hash }"
          :active="isDetailView"
          data-test="detail-view-link"
        />
        <TabLink
          v-if="!isNewView && hasEditView && editRecordSupported"
          :label="t('datasets.navigation.editView')"
          :to="{ ...editLocation, hash }"
          :active="isEditView"
          data-test="edit-view-link"
        />
        <TabLink
          v-if="!isNewView"
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
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ButtonLink from '../../../components/button/ButtonLink.vue';
import ContentAlignmentX from '../../../components/content/ContentAlignmentX.vue';
import IconStrokedArrowDown from '../../../components/svg/IconStrokedArrowDown.vue';
import TabLink from '../../../components/tab/TabLink.vue';
import { useDatasetLocationStore } from '../location/store/useDatasetLocationStore';
import { useDatasetPermissionStore } from '../permission/store/datasetPermissionStore';
import { useTableViewRouteQueryStore } from '../tableView/tableViewRouteQueryStore';
import { useDatasetViewStore } from '../view/store/datasetViewStore';
import { useRouter } from 'vue-router';

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
} = storeToRefs(useDatasetViewStore());

const { editRecordSupported } = storeToRefs(useDatasetPermissionStore());

const {
  tableLocation,
  detailLocation,
  editLocation,
  newLocation,
  rawLocation,
  quickLocation,
} = storeToRefs(useDatasetLocationStore());

const hash = computed(() => useRouter().currentRoute.value.hash);

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
