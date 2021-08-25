<template>
  <nav class="flex items-center justify-between p-2">
    <!-- Navbar left -->
    <div class="flex items-center space-x-3">
      <router-link
        :to="{ name: '' }"
        class="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden"
      >
        d
      </router-link>
      <!-- Toggle sidebar button -->
      <button
        class="p-2 rounded-md focus:outline-none focus:ring"
        @click="toggleSidebar"
      >
        <span class="sr-only">Toggle sidebar</span>
        <IconsChevronDoubleRightIcon
          aria-hidden="true"
          class="w-4 h-4 text-gray-600"
          :class="{
            'transform transition-transform -rotate-180': isSidebarOpen,
          }"
        />
      </button>
    </div>

    <!-- Navbar right -->
    <nav aria-label="Secondary" class="flex items-center space-x-3">
      <!-- Search button -->
      <NavbarIconButton label="Open search panel" @click="openSearchPanel">
        <IconsSearchIcon aria-hidden="true" class="w-6 h-6" />
      </NavbarIconButton>

      <!-- Settings Button -->
      <NavbarIconButton label="Open settings" @click="openSettingsPanel">
        <IconsCogIcon aria-hidden="true" class="w-6 h-6" />
      </NavbarIconButton>

      <!-- User Button -->
      <NavbarIconButton
        v-if="$auth.loggedIn"
        :label="$auth.user.preferred_username"
      >
        <IconsUserIcon aria-hidden="true" class="w-6 h-6" />
      </NavbarIconButton>
      <Button v-else @click="login">Login</Button>

      <!-- User menu - no component, so not shown -->
      <!-- <Menu v-slot="{ open }" as="div" class="relative">
        <MenuButton
          id="user-menu"
          aria-haspopup="true"
          :aria-expanded="open ? 'true' : 'false'"
          class="
            relative
            flex
            items-center
            overflow-hidden
            rounded-full
            group
            focus:outline-none
            focus:ring
          "
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="object-cover w-10 h-10 rounded-full group-hover:opacity-90"
            src="https://picsum.photos/200"
            alt="John Doe"
          />
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="
              absolute
              right-0
              z-20
              w-48
              py-1
              mt-2
              origin-top-right
              bg-white
              rounded-md
              shadow-lg
              focus:outline-none
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-gray-100': active }"
                role="menuitem"
              >
                Your Profile
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-gray-100': active }"
                role="menuitem"
              >
                Settings
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                :class="{ 'bg-gray-100': active }"
                role="menuitem"
              >
                Sign out
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu> -->
    </nav>
  </nav>
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
      openSearchPanel: 'ui/openSearchPanel',
      openSettingsPanel: 'ui/openSettingsPanel',
      toggleSidebar: 'ui/toggleSidebar',
    }),
    login() {
      this.$auth.loginWith('keycloak');
    },
  },
});
</script>
