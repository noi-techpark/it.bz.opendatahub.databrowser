<template>
  <AppLayout>
    <DatasetHero />
    <DatasetNavigation :current-view="currentView" />
    <RawView />
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import RawView from '../../domain/datasets/rawView/RawView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';

export default {
  components: { RawView, DatasetNavigation, DatasetHero, AppLayout },
  setup() {
    return {
      currentView: ViewPill.raw,
    };
  },
};
</script>
