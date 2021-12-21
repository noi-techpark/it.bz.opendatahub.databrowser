<template>
  <AppLayout>
    <DatasetHero />
    <DatasetNavigation :current-view="currentView" />
    <ContentArea>
      Dataset Detail Page (type = {{ datasetType }}, ID = {{ datasetId }})
    </ContentArea>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import ContentArea from '../../components/content/ContentArea.vue';
import { useRoute } from 'vue-router';
import { defineComponent } from '@vue/runtime-core';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';

export default defineComponent({
  components: {
    DatasetHero,
    DatasetNavigation,
    AppLayout,
    ContentArea,
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
