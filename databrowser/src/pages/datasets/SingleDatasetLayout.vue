<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

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
import { useApiParameterStore } from '../../domain/api/service/apiParameterStore';
import DatasetNavigation from '../../domain/datasets/header/DatasetNavigation.vue';
import DatasetBaseLayout from './DatasetBaseLayout.vue';

// console.log('defaultApiParams', useApiParameterStore().defaultApiParams);
// console.log('currentApiParams', useApiParameterStore().currentApiParams);

// useApiParameterStore().defaultApiParams = { language: 'en' };

withDefaults(
  defineProps<{
    ignoreSectionStyling?: boolean;
  }>(),
  {
    ignoreSectionStyling: false,
  }
);
</script>
