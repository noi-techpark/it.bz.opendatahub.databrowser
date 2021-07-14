<template>
  <div class="flex h-screen">
    <Backdrop
      :show="isSidebarOpen"
      class="lg:hidden"
      @close="isSidebarOpen = false"
    />
    <aside
      class="
        fixed
        inset-y-0
        z-10
        flex flex-col flex-shrink-0
        w-64
        max-h-screen
        transition-all
        transform
        bg-white
        border-r
        shadow-lg
        lg:z-auto lg:static lg:shadow-none
      "
      :class="{ '-translate-x-full lg:translate-x-0 lg:w-20': !isSidebarOpen }"
    >
      <!-- sidebar header -->
      <SidebarHeader />
      <!-- Sidebar links -->
      <nav
        aria-label="Main"
        class="flex-1 overflow-hidden hover:overflow-y-auto"
      >
        <!-- Sidebar Links... -->
        <ul class="p-2">
          <li>
            <router-link
              :to="{ name: 'index' }"
              class="
                flex
                items-center
                p-2
                overflow-hidden
                rounded-md
                hover:bg-gray-100
              "
              :class="{ 'justify-center': !isSidebarOpen }"
            >
              <IconsHomeIcon
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-400"
              />
              <span class="ml-2" :class="{ 'lg:hidden': !isSidebarOpen }"
                >Home</span
              >
            </router-link>
          </li>
          <li v-if="$auth.loggedIn">
            <router-link
              :to="{ name: 'mobility' }"
              class="
                flex
                items-center
                p-2
                overflow-hidden
                rounded-md
                hover:bg-gray-100
              "
              :class="{ 'justify-center': !isSidebarOpen }"
            >
              <IconsUserAddIcon
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-400"
              />
              <span class="ml-2" :class="{ 'lg:hidden': !isSidebarOpen }"
                >Mobility</span
              >
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- Sidebar footer -->
      <SidebarFooter />
    </aside>
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
});
</script>
