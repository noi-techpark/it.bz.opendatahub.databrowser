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
import ContentDivider from '../../components/content/ContentDivider.vue';
import DatasetNavigation from '../../domain/datasets/header/DatasetNavigation.vue';
import DatasetBaseLayout from './DatasetBaseLayout.vue';

import { defineProps } from 'vue';

defineProps({
  ignoreSectionStyling: {
    type: Boolean,
    default: false,
  },
});
</script>
