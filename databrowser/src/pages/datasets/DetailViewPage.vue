<template>
  <AppLayout>
    <DatasetHero :title="title" :subtitle="subtitle" />
    <ContentAlignmentX>
      <ContentAlignmentY>
        <DatasetNavigation :current-view="currentView" />
      </ContentAlignmentY>
      <ContentDivider />
      <ContentAlignmentY>
        <DetailView></DetailView>
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import { defineComponent } from '@vue/runtime-core';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';
import { useDatasetHeroDescription } from '../../domain/datasets/hero/useDatasetHeroDescription';
import DetailView from '../../domain/datasets/detailView/DetailView.vue';
import { useRoute } from 'vue-router';
import ContentDivider from '../../components/content/ContentDivider.vue';

export default defineComponent({
  components: {
    ContentAlignmentY,
    DatasetHero,
    DatasetNavigation,
    AppLayout,
    ContentAlignmentX,
    DetailView,
    ContentDivider,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType;
    const datasetId = route.params.datasetId;

    const { title, subtitle } = useDatasetHeroDescription();

    return {
      currentView: ViewPill.detail,
      datasetType,
      datasetId,
      title,
      subtitle,
    };
  },
});
</script>
