<template>
  <div class="flex flex-col w-full">
    <span class="py-2 pl-2 text-xl font-semibold">{{ title }}</span>
    <ul>
      <li
        v-for="item in items"
        :key="item.label"
        :class="[
          selected == item.label
            ? 'bg-green-500 bg-opacity-10'
            : 'hover:bg-gray-50',
        ]"
        class="flex whitespace-nowrap"
      >
        <button
          v-if="item.categories && item.categories.length"
          class="
            inline-flex
            flex-1
            justify-between
            items-center
            py-2
            px-2
            w-full
            max-w-xs
            text-left
          "
          @click="setSelected(item)"
        >
          <span class="pr-24">{{ item.label }}</span>
          <ArrowRight />
        </button>
        <router-link
          v-if="item.url"
          :to="item.url"
          class="flex-1 py-2 pr-24 pl-2 w-full text-left"
          >{{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import ArrowRight from '../../components/svg/ArrowRight.vue';
import { ref } from 'vue';

export type MenuItem = {
  label: string;
  categories?: Array<MenuItem>;
  url?: string;
};

export default defineComponent({
  components: { ArrowRight },
  props: {
    items: {
      type: Object as PropType<Array<MenuItem>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['selectCategory'],
  setup(props, context) {
    const selected = ref<string>('');

    function setSelected(menu: MenuItem) {
      context.emit('selectCategory', menu);
      selected.value = menu.label;
    }

    return { selected, setSelected };
  },
});
</script>
