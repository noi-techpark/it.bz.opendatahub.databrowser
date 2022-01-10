<template>
  <AppLayout>
    <DatasetHero />
    <ContentAlignmentX>
      <ContentAlignmentY>
        <DatasetNavigation :current-view="currentView" />
      </ContentAlignmentY>
      <ContentAlignmentY>
        <DetailView />
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import { useRoute } from 'vue-router';
import { defineComponent } from '@vue/runtime-core';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';
import DetailView from '../../domain/datasets/detailView/DetailView.vue';

export default defineComponent({
  components: {
    DetailView,
    ContentAlignmentY,
    DatasetHero,
    DatasetNavigation,
    AppLayout,
    ContentAlignmentX,
  },
  setup() {
    const route = useRoute();
    const datasetType = route.params.datasetType;
    const datasetId = route.params.datasetId;

    return {
      currentView: ViewPill.detail,
      datasetType,
      datasetId,
    };
  },
});
</script>
