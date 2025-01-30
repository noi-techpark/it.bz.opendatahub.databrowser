<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <section class="flex flex-1 flex-col justify-start overflow-y-auto">
    <TableFilterHint />
    <div id="oa-table-with-sticky-header" class="flex h-full overflow-y-auto">
      <div v-if="isError" class="grow">
        <LoadingError>{{ error }}</LoadingError>
      </div>
      <div v-else class="flex flex-1 flex-col overflow-y-auto">
        <TableContent
          :cols="cols"
          :rows="rows"
          :show-detail="hasDetailView"
          :show-edit="editRecordSupported"
          :show-delete="deleteRecordSupported"
          :dataset-domain="datasetDomain"
        />
        <TableFooter :pagination="pagination" />
      </div>
      <TableToolBox :url="fullPath" />
    </div>
  </section>
  <EditListDeleteDialog
    :show-dialog="deleteDialog.isVisible"
    :title="
      deleteDialog.idsToDelete.length === 1
        ? t('datasets.editView.dialog.deleteDialog.commonTitleSingular')
        : t('datasets.editView.dialog.deleteDialog.commonTitlePlural')
    "
    :description="
      deleteDialog.idsToDelete.length === 1
        ? t('datasets.editView.dialog.deleteDialog.commonDescriptionSingular')
        : t('datasets.editView.dialog.deleteDialog.commonDescriptionPlural')
    "
    :confirm-button-disabled="isDeleting"
    :close-button-disabled="isDeleting"
    @confirm-delete="onDelete()"
    @close="closeDeleteConfirmation()"
  />
  <GoToReferenceAttributeDialog />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import LoadingError from '../../../../components/loading/LoadingError.vue';
import { useI18n } from 'vue-i18n';
import TableContent from './TableContent.vue';
import TableFooter from './TableFooter.vue';
import TableFilterHint from './filter/TableFilterHint.vue';
import { useTableLoad } from './load/useTableLoad';
import { useTableViewRouteQueryStore } from './tableViewRouteQueryStore';
import TableToolBox from './toolBox/TableToolBox.vue';
import EditListDeleteDialog from '../../../cellComponents/components/utils/editList/dialogs/EditListDeleteDialog.vue';

import { useTableDelete } from './useTableDelete';
import GoToReferenceAttributeDialog from '../common/dialogs/goToReferenceAttributeDialog/GoToReferenceAttributeDialog.vue';

const { t } = useI18n();

const {
  cols,
  rows,
  pagination,
  isError,
  error,
  hasDetailView,
  editRecordSupported,
  deleteRecordSupported,
  fullPath,
  datasetDomain,
  refetch,
} = useTableLoad();

const { deleteDialog, onDelete, isDeleting, closeDeleteConfirmation } =
  useTableDelete(fullPath, refetch);

// Store TableView route query in a store for later use e.g. in DetailView
// to keep the query params when switching between DetailView and TableView.
const { currentRoute } = useRouter();
const { setRouteQuery } = useTableViewRouteQueryStore();
watch(currentRoute, ({ query }) => setRouteQuery(query), { immediate: true });
</script>
