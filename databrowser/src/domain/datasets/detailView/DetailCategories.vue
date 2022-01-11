<template>
  <PillLink
    v-for="category in categories"
    :key="category.slug"
    :to="category.to"
    :variant="PillVariant.edged"
    :active="currentSlug === category.slug"
    class="my-1"
  >
    {{ category.name }}
  </PillLink>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';
import { PillVariant } from '../../../components/pill/types';
import PillLink from '../../../components/pill/PillLink.vue';
import { RouteLocationRaw } from 'vue-router';

export interface DetailCategory {
  name: string;
  slug: string;
  to: RouteLocationRaw;
}

const props = defineProps<{
  categories: DetailCategory[];
  currentSlug: string;
}>();

const { categories, currentSlug } = toRefs(props);
</script>
