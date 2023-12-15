<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <section class="flex flex-1 flex-col justify-start overflow-y-auto">
    <LoadingError v-if="isError" :error="error" />
    <template v-else>
      <TableFilterHint />
      <div class="flex h-full overflow-y-auto">
        <div class="flex flex-1 flex-col overflow-y-auto">
          <TableContent
            :render-elements="renderElements"
            :rows="rows"
            :show-edit="showEdit"
            :show-delete="showDelete"
            :show-quick="showQuick"
          />
          <TableFooter
            :page-size="pageSize"
            :pagination="pagination"
            @page-size-changes="changePageSize"
            @paginate-to="changePage"
          />
        </div>
        <TableToolBox :url="url" />
      </div>
    </template>
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
    :confirm-button-disabled="isMutateLoading"
    :close-button-disabled="isMutateLoading"
    @confirm-delete="onDelete()"
    @close="closeDeleteConfirmation()"
  />
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import LoadingError from '../../../components/loading/LoadingError.vue';
import TableContent from './TableContent.vue';
import TableFooter from './TableFooter.vue';
import { useTableViewRouteQueryStore } from './tableViewRouteQueryStore';
import TableToolBox from './toolBox/TableToolBox.vue';
import { useTableViewLoading } from './useTableViewLoading';
import TableFilterHint from './filter/TableFilterHint.vue';
import { useEventDelete } from './utils';

import { useApiMutate, useApiReadForCurrentDataset } from '../../api';
import EditListDeleteDialog from '../../cellComponents/components/utils/editList/dialogs/EditListDeleteDialog.vue';

const { t } = useI18n();

const {
  error,
  isError,
  pageSize,
  pagination,
  renderElements,
  rows,
  showEdit,
  showDelete,
  showQuick,
  url,
  changePage,
  changePageSize,
  refetch,
} = useTableViewLoading();

const deleteDialog = ref({
  // NOTE: idsToDelete set as array to facilitate further implementations
  idsToDelete: [] as string[],
  isVisible: false,
});

const deleteUrl = ref();

const { url: urlWithNoParams } = useApiReadForCurrentDataset({
  withQueryParameters: false,
});

const { isMutateSuccess, mutate, isMutateLoading } = useApiMutate(
  deleteUrl,
  ref('delete')
);

// Store TableView route query in a store for later use e.g. in DetailView
// to keep the query params when switching between DetailView and TableView.
const { currentRoute } = useRouter();
const { setRouteQuery } = useTableViewRouteQueryStore();
watch(currentRoute, ({ query }) => setRouteQuery(query), { immediate: true });

watch(
  () => isMutateSuccess.value,
  (newValue: boolean) => {
    if (newValue) {
      closeDeleteConfirmation();
      refetch();
    }
  }
);

useEventDelete.on((id) => {
  if (id) {
    openDeleteConfirmation(id);
  }
});

const openDeleteConfirmation = (id: string) => {
  deleteDialog.value.isVisible = true;
  deleteDialog.value.idsToDelete = [id];
};

const closeDeleteConfirmation = () => {
  deleteDialog.value.isVisible = false;
  deleteDialog.value.idsToDelete = [];
};

const onDelete = async () => {
  for (const idToDelete of deleteDialog.value.idsToDelete) {
    deleteUrl.value = `${urlWithNoParams.value}/${idToDelete}`;

    mutate();
  }
};
</script>
