<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <div>
    <SelectCustom
      id="mobile-main-category"
      class="md:hidden"
      :options="selectOptions"
      :value="slug"
      :show-search-when-at-least-count-options="Infinity"
      @change="setSelectedCategory"
    />

    <div class="hidden flex-col md:flex">
      <PillLink
        v-for="category in categories"
        :key="category.slug"
        class="px-4 py-1"
        :to="categoryRouteLocation(category)"
        :active="slug === category.slug"
        :data-test="`desktop-main-category-${category.slug}`"
        @click="emit('change', category.slug)"
      >
        <span :class="{ 'text-error': category.isAnyPropertyError === true }">
          {{ computeLabel(category.name, category.isAnyPropertyRequired) }}
        </span>
      </PillLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import PillLink from '../../../../components/pill/PillLink.vue';
import SelectCustom from '../../../../components/select/SelectCustom.vue';
import { SelectOption } from '../../../../components/select/types';
import { Category } from './types';

const emit = defineEmits(['change']);

const props = defineProps<{
  categories: Category[];
  slug?: string;
}>();

const { categories, slug } = toRefs(props);

const computeLabel = (name: string, isAnyPropertyRequired?: boolean) =>
  name + (isAnyPropertyRequired ? ' *' : '');

const selectOptions = computed<SelectOption[]>(() =>
  categories.value.map((category) => ({
    label: computeLabel(category.name, category.isAnyPropertyRequired),
    value: category.slug,
  }))
);

const router = useRouter();

const setSelectedCategory = (slug: string) => {
  const nextCategory = categories.value.find(
    (category) => category.slug === slug
  );

  if (nextCategory != null) {
    router.replace(categoryRouteLocation(nextCategory));
  }
};

const categoryRouteLocation = (category: Category) => ({
  hash: `#${category.slug}`,
  query: router.currentRoute.value.query,
});
</script>
