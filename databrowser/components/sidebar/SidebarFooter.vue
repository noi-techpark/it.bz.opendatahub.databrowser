<template>
  <div class="flex-shrink-0 p-2 border-t max-h-14">
    <Button
      v-if="$auth.loggedIn"
      class="w-full text-gray-700 bg-gray-200 hover:bg-gray-300"
      @click="logout"
    >
      <IconsLogoutIcon aria-hidden="true" class="w-6 h-6" />
      <span :class="{ 'lg:hidden': !isSidebarOpen }" class="ml-2">
        Logout
      </span>
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    isSidebarOpen() {
      return this.$store.state.ui.isSidebarOpen;
    },
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
});
</script>
