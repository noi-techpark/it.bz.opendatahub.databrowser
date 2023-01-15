<template>
  <div class="w-full">
    <button class="inline-flex items-center" @click="$emit('arrow-back')">
      <ArrowLeft
        v-if="showArrow"
        :title="t('header.menu.goBackAction')"
        class="md:hidden"
      />
      <span class="py-2 pl-2 text-xl font-semibold">{{ item.label }}</span>
    </button>
    <ul class="min-w-[20rem] md:max-w-xs">
      <li
        v-for="(category, index) in item.items"
        :key="category.label"
        :class="[
          selected == index ? 'bg-green-500 bg-opacity-10' : 'hover:bg-gray-50',
        ]"
        class="flex whitespace-nowrap"
      >
        <button
          v-if="isMenuCategory(category) && category.items.length"
          class="inline-flex w-full flex-1 items-center justify-between py-2 px-4 text-left md:max-w-xs"
          @click="setSelected(category, index)"
        >
          <span>{{ category.label }}</span>
          <ArrowRight />
        </button>
        <router-link
          v-if="isMenuLink(category)"
          :to="category.url"
          class="w-full flex-1 py-2 px-4 text-left no-underline"
          @click="$emit('close-dialog')"
        >
          {{ category.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, withDefaults } from 'vue';
import ArrowRight from '../../components/svg/ArrowRight.vue';
import ArrowLeft from '../../components/svg/ArrowLeft.vue';
import { useI18n } from 'vue-i18n';

export type MenuLink = {
  label: string;
  url: string;
};

export type MenuColumn = {
  label: string;
  items: Array<MenuColumn | MenuLink>;
};

const { t } = useI18n();

const props = withDefaults(
  defineProps<{ item: MenuColumn; showArrow?: boolean }>(),
  {
    showArrow: false,
  }
);

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'selectCategory', menu: MenuColumn): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'arrow-back'): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'close-dialog'): void;
}>();

const selected = ref<number>(-1);

// This clears the selected entity when the item changes.
// This is necessary since we do not always unmount the components so ghosting can occur.
watch(
  () => props.item,
  () => (selected.value = -1)
);

const isMenuCategory = (data: MenuColumn | MenuLink): data is MenuColumn => {
  return !!(data as MenuColumn).items;
};

const isMenuLink = (data: MenuColumn | MenuLink): data is MenuLink => {
  return !!(data as MenuLink).url;
};

function setSelected(menu: MenuColumn, index: number) {
  emit('selectCategory', menu);
  selected.value = index;
}
</script>
