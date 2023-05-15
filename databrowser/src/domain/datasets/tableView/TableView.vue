<template>
  <section class="flex flex-1 flex-col justify-start overflow-y-auto">
    <LoadingError v-if="isError" :error="error" />
    <template v-else>
      <div class="flex h-full overflow-y-auto">
        <div class="flex flex-1 flex-col overflow-y-auto">
          <TableContent
            :render-elements="renderElements"
            :rows="rows"
            :show-edit="showEdit"
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
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import LoadingError from '../../../components/loading/LoadingError.vue';
import TableContent from './TableContent.vue';
import TableFooter from './TableFooter.vue';
import { useTableViewRouteQueryStore } from './tableViewRouteQueryStore';
import TableToolBox from './toolBox/TableToolBox.vue';
import { useTableViewLoading } from './useTableViewLoading';

const {
  error,
  isError,
  pageSize,
  pagination,
  renderElements,
  rows,
  showEdit,
  showQuick,
  url,
  changePage,
  changePageSize,
} = useTableViewLoading();

// Store TableView route query in a store for later use e.g. in DetailView
// to keep the query params when switching between DetailView and TableView.
const { currentRoute } = useRouter();
const { setRouteQuery } = useTableViewRouteQueryStore();
watch(currentRoute, ({ query }) => setRouteQuery(query), { immediate: true });
</script>
