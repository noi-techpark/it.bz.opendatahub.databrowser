<template>
  <AppLayout>
    <Hero>
      <HeroTitle>All POIs</HeroTitle>
      <HeroSubTitle
        >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
      </HeroSubTitle>
      <InternalLink to="/" tone="primary">More information</InternalLink>
    </Hero>

    <DatasetNavigation :current-view="currentView" />
    <DatasetTable></DatasetTable>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import AppLayout from '../../layouts/AppLayout.vue';
import Hero from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import InternalLink from '../../components/link/InternalLink.vue';
import DatasetTable from '../../domain/datasets/tableView/DatasetTable.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';

export default defineComponent({
  components: {
    DatasetNavigation,
    AppLayout,
    Hero,
    HeroTitle,
    HeroSubTitle,
    InternalLink,
    DatasetTable,
  },
  setup() {
    return {
      currentView: ViewPill.table,
    };
  },
});
</script>
