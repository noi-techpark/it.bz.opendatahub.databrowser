<template>
  <Tab v-slot="{ selected }">
    <button
      :class="[
        selected
          ? 'text-green-500 bg-opacity-10 bg-green-500 border-green-500'
          : 'hover:bg-gray-200',
      ]"
      class="
        group
        py-1
        px-5
        font-semibold
        rounded-full
        text-center text-gray-700
        border border-gray-400
      "
    >
      <slot />
    </button>
  </Tab>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import { Tab } from '@headlessui/vue';

export default defineComponent({
  components: { Tab },
});
</script>
