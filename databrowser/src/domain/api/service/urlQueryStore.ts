// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { readonly, ref, watch } from 'vue';
import { useApiParameterStore } from './apiParameterStore';
import { stringifyQuery, useRouter } from 'vue-router';
import { ApiParams } from './types';
import { stringifyParameter } from './query';

export const useUrlQueryStore = defineStore('urlQueryStore', () => {
  const router = useRouter();

  const { allApiParams, currentApiParams, nonDefaultApiParams } = storeToRefs(
    useApiParameterStore()
  );

  const currentUrlQuery = ref('');

  // Update route if any API parameter changes
  watch(allApiParams, (allApiParams) => {
    // const urlQuery = stringifyQuery(allApiParams);

    // if (urlQuery === currentUrlQuery.value) {
    //   console.debug(
    //     'urlQueryStore: skip route update',
    //     urlQuery,
    //     currentUrlQuery.value
    //   );
    //   return;
    // } else {
    //   console.debug(
    //     'urlQueryStore different urls',
    //     urlQuery,
    //     currentUrlQuery.value
    //   );
    // }

    // currentUrlQuery.value = urlQuery;

    currentUrlQuery.value = stringifyQuery(allApiParams);

    // console.log('urlQueryStore: update route', currentUrlQuery.value);
    console.group('urlQueryStore: update route from API params');
    console.log('allApiParams', JSON.parse(JSON.stringify(allApiParams)));
    console.log(
      'currentApiParams.value',
      JSON.parse(JSON.stringify(currentApiParams.value))
    );
    console.log(
      'currentUrlQuery',
      JSON.parse(JSON.stringify(currentUrlQuery.value))
    );
    console.groupEnd();

    router.replace({
      query: nonDefaultApiParams.value,
      hash: router.currentRoute.value.hash,
    });
  });

  // Use query from current route. This is needed to update the API parameters
  // when the user enters / changes the URL manually. This is also needed to update
  // the API parameters when the user uses the back / forward buttons of the browser.
  watch(
    () => router.currentRoute.value.query,
    (query) => {
      // console.log('urlQueryStore: update api params', query);
      console.group('urlQueryStore: update API params from route query');
      console.log('query', JSON.parse(JSON.stringify(query)));
      console.log(
        'currentApiParams.value',
        JSON.parse(JSON.stringify(currentApiParams.value))
      );
      console.log(
        'currentUrlQuery',
        JSON.parse(JSON.stringify(currentUrlQuery.value))
      );
      console.groupEnd();
      currentApiParams.value = Object.entries(query).reduce<ApiParams>(
        (prev, [key, value]) => ({ ...prev, [key]: stringifyParameter(value) }),
        {}
      );
    }
  );

  return { currentUrlQuery: readonly(currentUrlQuery) };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUrlQueryStore, import.meta.hot));
}
