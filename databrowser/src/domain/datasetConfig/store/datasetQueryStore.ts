// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { Ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDatasetInfoStore } from './datasetInfoStore';

export const useDatasetQueryStore = defineStore('datasetRoutingStore', () => {
  const { datasetQuery } = storeToRefs(useDatasetInfoStore());
  const router = useRouter();

  const buildQueryHandler = (name: string) =>
    computed({
      get: () => datasetQuery.value?.stringified[name],
      set: (value: string | null | undefined) => {
        // If the value is undefined, use the default value from the dataset config
        const nextValue = value ?? datasetQuery.value?.default[name];

        // Change route query
        const query = { ...router.currentRoute.value.query };
        if (nextValue == null) {
          delete query[name];
        } else {
          query[name] = nextValue;
        }
        router.push({ query });
      },
    });

  // Compute query handlers once on datasetQuery change to be reused in handle()
  const queryHandlers = computed(() => {
    return Object.keys(datasetQuery.value?.raw ?? {}).reduce<
      Record<string, Ref<string | undefined>>
    >((prev, name) => ({ ...prev, [name]: buildQueryHandler(name) }), {});
  });

  const handle = (name: string) =>
    computed({
      get: () => queryHandlers.value[name]?.value,
      set: (value: string | undefined) => {
        // Handle the case where the query handler is not defined, e.g. because
        // the query parameter is not defined in the dataset config. Examples
        // for this are the query parameters "searchfilter" or "rawfilter"
        if (queryHandlers.value[name] == null) {
          const query = { ...router.currentRoute.value.query, [name]: value };
          router.push({ query });
        }
        queryHandlers.value[name].value = value;
      },
    });

  return { handle };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetQueryStore, import.meta.hot)
  );
}
