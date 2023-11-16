// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useDatasetInfoStore } from './datasetInfoStore';

export const useDatasetQueryStore = defineStore('datasetRoutingStore', () => {
  const router = useRouter();

  const getQueryValue = (name: string) => {
    const { datasetQuery } = useDatasetInfoStore();
    const stringParts = datasetQuery?.stringParts ?? {};
    return stringParts[name];
  };

  const setQueryValue = (
    name: string,
    value: string | null | undefined,
    navigationType: 'push' | 'replace' = 'push'
  ) => {
    const query = { ...router.currentRoute.value.query };
    if (value == null) {
      delete query[name];
    } else {
      query[name] = value;
    }
    router[navigationType]({ query });
  };

  return { getQueryValue, setQueryValue };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetQueryStore, import.meta.hot)
  );
}
