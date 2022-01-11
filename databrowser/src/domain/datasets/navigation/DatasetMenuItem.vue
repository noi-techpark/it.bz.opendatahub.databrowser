<template>
  <div class="w-full max-w-xs bg-green-200">
    <ul class="w-full bg-red-400">
      <li
        :class="[showDetails ? 'bg-green-200' : 'hover:bg-gray-100']"
        class="w-full"
      >
        <a
          v-if="item.url"
          :href="item.url"
          class="block py-2 px-10 w-full underline"
        >
          {{ item.label }}
        </a>
        <button v-else class="py-2 px-10 w-full" @click="openSubCategory">
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
  <div v-if="showDetails">
    <ul v-if="item.categories && item.categories.length">
      <DatasetMenuItem
        v-for="child in item.categories"
        :key="child.label"
        :item="child"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { ref } from 'vue';

export type MenuItem = {
  label: string;
  categories?: Array<MenuItem>;
  url?: string;
};

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },
  setup() {
    const showDetails = ref<boolean>(false);

    function openSubCategory() {
      showDetails.value = !showDetails.value;
    }

    return {
      showDetails,
      openSubCategory,
    };
  },
});
</script>
