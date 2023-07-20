// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { App, computed, inject, isRef, Ref, ref, watch } from 'vue';
import { Router } from 'vue-router';
import { UrlQuery, UrlParameters } from './types';
import { buildUrlQuery } from './urlBuilder';
import { useApiParameterHandler } from './apiParameterHandler';

export const urlQueryHandlerKey = 'url-query-handler';

export const createUrlQueryHandler = (router: Router): UrlQuery => {
  const currentUrlQuery = ref('');
  const {
    allApiParameters,
    cleanApiParameters,
    setApiParameters,
    cleanApiParametersExtendWith,
  } = useApiParameterHandler();

  // Update route if API query parameters change
  watch(
    () => allApiParameters.value,
    (allApiParameters) => {
      const urlQuery = buildUrlQuery(allApiParameters, ['language'], '?');
      currentUrlQuery.value = urlQuery;

      router.replace({
        query: { ...cleanApiParameters.value },
        hash: router.currentRoute.value.hash,
      });
    }
  );

  // Use initial parameters from current route
  watch(
    () => router?.currentRoute.value.query,
    (query) => setApiParameters(query)
  );

  const useUrlWithQueryParameters = (url: string | Ref<string>) =>
    computed(() => {
      const urlValue = isRef(url) ? url.value : url;
      return `${urlValue}${currentUrlQuery.value}`;
    });

  const cleanQueryParametersExtendedWith = (
    queryParameters: UrlParameters
  ): UrlParameters => cleanApiParametersExtendWith(queryParameters);

  return {
    useUrlWithQueryParameters,
    cleanQueryParametersExtendedWith,

    install(app: App) {
      const urlQueryHandler = this;
      app.provide(urlQueryHandlerKey, urlQueryHandler);
    },
  };
};

export const useUrlQuery = (): UrlQuery => inject(urlQueryHandlerKey)!;
