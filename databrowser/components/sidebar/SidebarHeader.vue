<template>
  <div
    class="flex items-center justify-between flex-shrink-0 p-2"
    :class="{ 'lg:justify-center': !isSidebarOpen }"
  >
    <router-link
      :to="{ name: '' }"
      class="
        p-2
        text-xl
        font-semibold
        leading-8
        tracking-wider
        uppercase
        whitespace-nowrap
      "
    >
      D<span :class="{ 'lg:hidden': !isSidebarOpen }">ATABROWSER</span>
    </router-link>
    <button class="p-2 rounded-md lg:hidden" @click="toggleSidebar">
      <svg
        class="w-6 h-6 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

export default Vue.extend({
  computed: {
    isSidebarOpen() {
      return this.$store.state.ui.isSidebarOpen;
    },
  },
  methods: {
    ...mapMutations({
      toggleSidebar: 'ui/toggleSidebar',
    }),
  },
});
</script>
