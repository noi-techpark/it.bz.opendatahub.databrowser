<template>
  <AppLayout>
    <DatasetHero :title="title" :subtitle="subtitle" />
    <ContentAlignmentX>
      <ContentAlignmentY>
        <DatasetNavigation :current-view="currentView" />
      </ContentAlignmentY>
      <ContentDivider />
      <ContentAlignmentY>
        <TableView></TableView>
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TableView from '../../domain/datasets/tableView/TableView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentDivider from '../../components/content/ContentDivider.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';
import { useDatasetHeroDescription } from '../../domain/datasets/hero/useDatasetHeroDescription';

export default defineComponent({
  components: {
    ContentAlignmentY,
    ContentDivider,
    ContentAlignmentX,
    AppLayout,
    DatasetHero,
    DatasetNavigation,
    TableView,
  },
  setup() {
    const { title, subtitle } = useDatasetHeroDescription();

    return {
      currentView: ViewPill.table,
      title,
      subtitle,
    };
  },
});
</script>
