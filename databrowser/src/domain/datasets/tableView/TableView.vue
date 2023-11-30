<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <section class="flex flex-1 flex-col justify-start overflow-y-auto">
    <TableFilterHint />
    <div class="flex h-full overflow-y-auto">
      <div v-if="isError" class="flex flex-1">
        <LoadingError :error="error" />
      </div>
      <div v-else class="flex flex-1 flex-col overflow-y-auto">
        <TableContent
          :cols="cols"
          :rows="rows"
          :show-detail="hasDetailView"
          :show-edit="editRecordSupported"
          :show-quick="hasQuickView"
          :dataset-domain="datasetDomain"
        />
        <!-- :show-detail="hasDetailView"
          :show-edit="editRecordSupported"
          :show-quick="hasQuickView" -->
        <TableFooter :pagination="pagination" />
      </div>
      <TableToolBox :url="fullPath" :cols="cols" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import LoadingError from '../../../components/loading/LoadingError.vue';
import TableContent from './TableContent.vue';
import TableFooter from './TableFooter.vue';
import { useTableViewRouteQueryStore } from './tableViewRouteQueryStore';
import TableToolBox from './toolBox/TableToolBox.vue';
import { useTableLoad } from './load/useTableLoad';
import TableFilterHint from './filter/TableFilterHint.vue';

const {
  cols,
  rows,
  pagination,
  isError,
  error,
  hasDetailView,
  hasQuickView,
  editRecordSupported,
  fullPath,
  datasetDomain,
} = useTableLoad();

// Store TableView route query in a store for later use e.g. in DetailView
// to keep the query params when switching between DetailView and TableView.
const { currentRoute } = useRouter();
const { setRouteQuery } = useTableViewRouteQueryStore();
watch(currentRoute, ({ query }) => setRouteQuery(query), { immediate: true });
</script>
