<template>
  <AppLayout>
    <DatasetHero
      :description="description"
      :subtitle="subtitle"
      :title="title"
    />
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

<script lang="ts" setup>
import AppLayout from '../../layouts/AppLayout.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import RawView from '../../domain/datasets/rawView/RawView.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';
import { useDatasetHeroDescription } from '../../domain/datasets/hero/useDatasetHeroDescription';

const currentView = ViewPill.raw;
const { title, subtitle, description } = useDatasetHeroDescription();
</script>
