import { App, computed, inject, ref, watch } from 'vue';
import { Router } from 'vue-router';
import { ApiQuery, UrlQuery, UrlParameters } from './types';
import { buildUrlQuery } from './urlBuilder';

export const urlQueryHandlerKey = 'url-query-handler';

export const createUrlQueryHandler = (
  router: Router,
  apiQuery: ApiQuery
): UrlQuery => {
  const currentUrlQuery = ref('');

  // Update route if API query parameters change
  watch(
    () => apiQuery.allApiParameters.value,
    (allApiParameters) => {
      const urlQuery = buildUrlQuery(allApiParameters, '?');
      currentUrlQuery.value = urlQuery;

      router.replace({
        query: { ...apiQuery.cleanApiParameters.value },
        hash: router.currentRoute.value.hash,
      });
    }
  );

  // Use initial parameters from current route
  watch(
    () => router?.currentRoute.value.query,
    (query) => apiQuery.setApiParameters(query)
  );

  const useUrlWithQueryParameters = (baseUrl: string | undefined) =>
    computed(() => `${baseUrl}${currentUrlQuery.value}`);

  const cleanQueryParametersExtendedWith = (
    queryParameters: UrlParameters
  ): UrlParameters => apiQuery.cleanApiParametersExtendWith(queryParameters);

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
