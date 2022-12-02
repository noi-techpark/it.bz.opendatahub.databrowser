<template>
  <DatasetBaseLayout>
    <ContentDivider />
    <DatasetNavigation />
    <ContentDivider />
    <section class="flex flex-col overflow-y-auto">
      <slot></slot>
    </section>
  </DatasetBaseLayout>
</template>

<script setup lang="ts">
import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetNavigation from '../../domain/datasets/header/DatasetNavigation.vue';
import DatasetBaseLayout from './DatasetBaseLayout.vue';
</script>
