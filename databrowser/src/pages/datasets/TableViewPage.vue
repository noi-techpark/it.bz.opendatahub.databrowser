<template>
  <AppLayout>
    <DatasetHero />
    <DatasetNavigation :current-view="currentView" />
    <TableView></TableView>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TableView from '../../domain/datasets/tableView/TableView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import AppLayout from '../../layouts/AppLayout.vue';

export default defineComponent({
  components: {
    AppLayout,
    DatasetHero,
    DatasetNavigation,
    TableView,
  },
  setup() {
    return {
      currentView: ViewPill.table,
    };
  },
});
</script>
