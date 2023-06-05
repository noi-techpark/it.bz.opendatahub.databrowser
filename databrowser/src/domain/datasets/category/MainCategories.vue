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
        class="py-1 px-4"
        :to="category.to"
        :active="slug === category.slug"
        :data-test="`desktop-main-category-${category.slug}`"
        @click="emit('change', category.slug)"
      >
        <span :class="{ 'text-error': category.isAnyFieldError === true }">
          {{ computeLabel(category.name, category.isAnyFieldRequired) }}
        </span>
      </PillLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import PillLink from '../../../components/pill/PillLink.vue';
import { Category } from './types';
import SelectCustom from '../../../components/select/SelectCustom.vue';
import { SelectOption } from '../../../components/select/types';

const emit = defineEmits(['change']);

const props = defineProps<{
  categories: Category[];
  slug?: string;
}>();

const { categories, slug } = toRefs(props);

const computeLabel = (name: string, isAnyFieldRequired?: boolean) =>
  name + (isAnyFieldRequired ? ' *' : '');

const selectOptions = computed<SelectOption[]>(() =>
  categories.value.map((category) => ({
    label: computeLabel(category.name, category.isAnyFieldRequired),
    value: category.slug,
  }))
);

const router = useRouter();

const setSelectedCategory = (slug: string) => {
  const nextCategory = categories.value.find(
    (category) => category.slug === slug
  );

  if (nextCategory != null) {
    router.push(nextCategory?.to);
  }
};
</script>
