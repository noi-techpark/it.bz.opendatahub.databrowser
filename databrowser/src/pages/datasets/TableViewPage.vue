<template>
  <TableViewLayout>
    <Hero>
      <HeroTitle>All POIs</HeroTitle>
      <HeroSubTitle
        >Lorem ipsum dolor sit amen dolr sit amen dolr ist ist amen.
      </HeroSubTitle>
      <InternalLink to="/" tone="primary">More information</InternalLink>
    </Hero>

    <div class="flex flex-col h-full">
      <DatasetNavigation :current-view="currentView" />
      <TableView></TableView>
    </div>
  </TableViewLayout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import TableViewLayout from '../../layouts/TableViewLayout.vue';
import Hero from '../../components/hero/HeroContainer.vue';
import HeroTitle from '../../components/hero/HeroTitle.vue';
import HeroSubTitle from '../../components/hero/HeroSubTitle.vue';
import InternalLink from '../../components/link/InternalLink.vue';
import TableView from '../../domain/datasets/tableView/TableView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';

export default defineComponent({
  components: {
    DatasetNavigation,
    TableViewLayout,
    Hero,
    HeroTitle,
    HeroSubTitle,
    InternalLink,
    TableView,
  },
  setup() {
    return {
      currentView: ViewPill.table,
    };
  },
});
</script>
