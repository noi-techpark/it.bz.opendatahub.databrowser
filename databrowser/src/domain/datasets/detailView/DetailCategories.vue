<template>
  <div>
    <SelectCustom
      class="md:hidden"
      :options="selectOptions"
      :size="SelectSize.md"
      @change="setSelectedCategory"
    />

    <div class="hidden flex-col md:flex">
      <PillLink
        v-for="category in categories"
        :key="category.slug"
        :to="category.to"
        :active="slug === category.slug"
      >
        {{ category.name }}
      </PillLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import PillLink from '../../../components/pill/PillLink.vue';
import { DetailCategory } from './types';
import SelectCustom from '../../../components/select/SelectCustom.vue';
import { SelectOption, SelectSize } from '../../../components/select/types';

const props = defineProps<{
  categories: DetailCategory[];
  slug: string;
}>();

const { categories, slug } = toRefs(props);

const selectOptions = computed<SelectOption[]>(() =>
  categories.value.map((category) => ({
    label: category.name,
    value: category.slug,
    selected: slug.value === category.slug,
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
