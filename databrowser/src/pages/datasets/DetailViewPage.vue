<template>
  <AppLayout>
    <DatasetHero
      :description="description"
      :subtitle="subtitle"
      :title="title"
    />
    <ContentAlignmentX>
      <ContentAlignmentY>
        <DatasetNavigation :current-view="currentView" />
      </ContentAlignmentY>
      <ContentDivider />
      <ContentAlignmentY>
        <DetailView />
      </ContentAlignmentY>
    </ContentAlignmentX>
  </AppLayout>
</template>

<script lang="ts" setup>
import AppLayout from '../../layouts/AppLayout.vue';
import ContentAlignmentX from '../../components/content/ContentAlignmentX.vue';
import { ViewPill } from '../../domain/datasets/navigation/types';
import DatasetNavigation from '../../domain/datasets/navigation/DatasetNavigation.vue';
import DatasetHero from '../../domain/datasets/DatasetHero.vue';
import ContentAlignmentY from '../../components/content/ContentAlignmentY.vue';
import { useDatasetHeroDescription } from '../../domain/datasets/hero/useDatasetHeroDescription';
import DetailView from '../../domain/datasets/detailView/DetailView.vue';
import ContentDivider from '../../components/content/ContentDivider.vue';

const currentView = ViewPill.detail;
const { title, subtitle, description } = useDatasetHeroDescription();
</script>
