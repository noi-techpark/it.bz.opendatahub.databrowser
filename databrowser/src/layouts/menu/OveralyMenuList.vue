<template>
  <div class="flex flex-col w-full">
    <button class="inline-flex items-center" @click="$emit('arrow-back')">
      <ArrowLeft
        v-if="showArrow"
        :title="$t('header.menu.goBackAction')"
        class="md:hidden"
      />
      <span class="py-2 pl-2 text-xl font-semibold">{{ item.label }}</span>
    </button>
    <ul class="md:max-w-xs min-w-[20rem]">
      <li
        v-for="(category, index) in item.categories"
        :key="category.label"
        :class="[
          selected == index ? 'bg-green-500 bg-opacity-10' : 'hover:bg-gray-50',
        ]"
        class="flex whitespace-nowrap"
      >
        <button
          v-if="isMenuCategory(category) && category.categories.length"
          class="
            inline-flex
            flex-1
            justify-between
            items-center
            py-2
            px-4
            w-full
            md:max-w-xs
            text-left
          "
          @click="setSelected(category, index)"
        >
          <span>{{ category.label }}</span>
          <ArrowRight />
        </button>
        <router-link
          v-if="category.url"
          :to="category.url"
          class="flex-1 py-2 px-4 w-full text-left"
          @click="$emit('close-dialog')"
          >{{ category.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import ArrowRight from '../../components/svg/ArrowRight.vue';
import { ref, watch } from 'vue';
import ArrowLeft from '../../components/svg/ArrowLeft.vue';

export type MenuLink = {
  label: string;
  url: string;
};

export type MenuCategory = {
  label: string;
  categories: Array<MenuCategory | MenuLink>;
};

export default defineComponent({
  components: { ArrowLeft, ArrowRight },
  props: {
    item: {
      type: Object as PropType<MenuCategory | MenuLink>,
      required: true,
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectCategory', 'arrow-back', 'close-dialog'],
  setup(props, context) {
    const selected = ref<number>(-1);

    // This clears the selected entity when the item changes.
    // This is necessary since we do not always unmount the components so ghosting can occur.
    watch(
      () => props.item,
      () => (selected.value = -1)
    );

    const isMenuCategory = (
      data: MenuCategory | MenuLink
    ): data is MenuCategory => {
      return !!(data as MenuCategory).categories;
    };

    function setSelected(menu: MenuCategory, index: number) {
      context.emit('selectCategory', menu);
      selected.value = index;
    }

    return { selected, setSelected, isMenuCategory };
  },
});
</script>
