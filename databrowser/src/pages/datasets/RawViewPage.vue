<template>
  <AppLayout>
    <DatasetHero />
    <ContentAlignmentX>
      <ContentAlignmentY>
        <DatasetNavigation :current-view="currentView" hide-langauge-picker />
      </ContentAlignmentY>
      <ContentAlignmentY>
        <RawView />
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '../../layouts/AppLayout.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import RawView from '../../domain/datasets/rawView/RawView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';

export default {
  components: {
    ContentAlignmentY,
    ContentAlignmentX,
    RawView,
    DatasetNavigation,
    DatasetHero,
    AppLayout,
  },
  setup() {
    return {
      currentView: ViewPill.raw,
    };
  },
};
</script>
