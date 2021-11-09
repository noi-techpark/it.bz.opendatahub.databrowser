<template>
  <ErrorBoundary>
    <div class="antialiased text-gray-900 bg-white">
      <div class="flex h-screen overflow-y-hidden bg-white">
        <!-- Sidebar -->
        <Sidebar />

        <div class="flex flex-col flex-1 h-full overflow-hidden">
          <!-- Navbar -->
          <header class="flex-shrink-0 border-b">
            <Navbar />
          </header>
          <!-- Main content -->
          <main class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
            <div v-if="hasError">
              <div>
                <Button class="btn-blue" @click="closeAllErrors"
                  >Close all errors</Button
                >
              </div>
              <Alert
                v-for="errorEntry in errors"
                :key="errorEntry.id"
                :value="errorEntry"
                class="my-2"
                :title="getErrorTitle(errorEntry)"
                :content="getErrorContent(errorEntry)"
                @close="closeError(errorEntry)"
              ></Alert>
            </div>
            <Nuxt />
          </main>
          <!-- Main footer -->
          <footer
            class="
              flex
              items-center
              justify-between
              flex-shrink-0
              p-4
              border-t
              max-h-14
            "
          >
            <div>NOI &copy; {{ new Date().getUTCFullYear() }}</div>
            <div>
              <!-- Github svg -->
              <a
                href="https://github.com/noi-techpark/it.bz.opendatahub.databrowser"
                target="_blank"
                class="flex items-center space-x-1"
              >
                <svg
                  class="w-6 h-6 text-gray-400"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
                <span class="hidden text-sm md:block">View on Github</span>
              </a>
            </div>
          </footer>
        </div>

        <SettingsPanel
          :show="isSettingsPanelOpen"
          @close="closeSettingsPanel"
        />
        <SearchPanel left :show="isSearchPanelOpen" @close="closeSearchPanel" />
      </div>
    </div>
  </ErrorBoundary>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations } from 'vuex';

import ErrorBoundary from '~/modules/error/components/ErrorBoundary.vue';
import Alert from '~/components/global/Alert.vue';
import Navbar from '~/components/navbar/Navbar.vue';
import SearchPanel from '~/components/panels/SearchPanel.vue';
import SettingsPanel from '~/components/panels/SettingsPanel.vue';
import Sidebar from '~/components/sidebar/Sidebar.vue';
import { ErrorEntry } from '~/modules/error/store';
import Button from '~/components/global/Button.vue';

export default Vue.extend({
  components: {
    Alert,
    Button,
    ErrorBoundary,
    Navbar,
    SearchPanel,
    SettingsPanel,
    Sidebar,
  },
  computed: {
    errors(): ErrorEntry[] {
      return this.$store.state.error?.errors ?? [];
    },
    hasError() {
      return this.$store.state.error?.errors?.length > 0;
    },
    isSidebarOpen() {
      return this.$store.state.ui.isSidebarOpen;
    },
    isSearchPanelOpen() {
      return this.$store.state.ui.isSearchPanelOpen;
    },
    isSettingsPanelOpen() {
      return this.$store.state.ui.isSettingsPanelOpen;
    },
  },
  methods: {
    closeAllErrors(): void {
      this.$store.dispatch('error/removeAllErrors');
    },
    closeError(errorEntry: ErrorEntry): void {
      this.$store.dispatch('error/removeError', { id: errorEntry.id });
    },
    getErrorTitle(error: ErrorEntry): string {
      if (error.error == null) {
        return '';
      }
      return error.error.name ?? '';
    },
    getErrorContent(errorEntry: ErrorEntry): string {
      const date =
        errorEntry.timestamp != null ? new Date(errorEntry.timestamp) : null;
      const info = { id: errorEntry.id, date };

      return `${errorEntry.error?.message ?? ''} (${JSON.stringify(info)})`;
    },
    ...mapMutations({
      closeSearchPanel: 'ui/closeSearchPanel',
      closeSettingsPanel: 'ui/closeSettingsPanel',
      openSettingsPanel: 'ui/openSettingsPanel',
    }),
  },
});
</script>
