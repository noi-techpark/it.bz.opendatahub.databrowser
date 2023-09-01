// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

export const useTestStore = defineStore('testStore', () => {
  const router = useRouter();
  watch(
    () => router.currentRoute.value,
    async (route, oldRoute) => {
      console.log('teststore route updated', route, oldRoute);
    },
    { immediate: true }
  );
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTestStore, import.meta.hot));
}
