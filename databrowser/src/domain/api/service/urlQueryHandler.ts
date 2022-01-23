import { App, computed, inject, ref, watch } from 'vue';
import { Router } from 'vue-router';
import { buildQueryFilter } from '../client/fetcher/list';
import { ApiQuery, UrlQuery, UrlParameters } from './types';

export const urlQueryHandlerKey = 'url-query-handler';

export const createUrlQueryHandler = (
  router: Router,
  apiQuery: ApiQuery
): UrlQuery => {
  const currentQueryFilters = ref('');

  // Update route if API query parameters change
  watch(
    () => apiQuery.allApiParameters.value,
    (allApiParameters) => {
      const queryFilters = buildQueryFilter(allApiParameters, '?');
      currentQueryFilters.value = queryFilters;

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
    computed(() => `${baseUrl}${currentQueryFilters.value}`);

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
