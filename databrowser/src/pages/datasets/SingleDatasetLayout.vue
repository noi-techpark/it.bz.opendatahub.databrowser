<template>
  <DatasetBaseLayout>
    <ContentDivider />
    <DatasetNavigation />
    <ContentDivider />
    <section
      :class="ignoreSectionStyling ? '' : `flex overflow-y-auto flex-col`"
    >
      <slot></slot>
    </section>
  </DatasetBaseLayout>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetNavigation from '../../domain/datasets/header/DatasetNavigation.vue';
import DatasetBaseLayout from './DatasetBaseLayout.vue';

withDefaults(
  defineProps<{
    ignoreSectionStyling?: boolean;
  }>(),
  {
    ignoreSectionStyling: false,
  }
);
</script>
