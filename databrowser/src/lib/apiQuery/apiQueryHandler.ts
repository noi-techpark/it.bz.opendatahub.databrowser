import { App, computed, inject } from 'vue';
import { Router } from 'vue-router';
import { ApiQuery, QueryParameters, QueryParameterValue } from './types';

export const apiQueryHandlerKey = 'api-query-handler';

export const createApiQueryHandler = (): ApiQuery => {
  let router: Router;

  const currentQueryParameters = computed(
    () => router.currentRoute.value?.query
  );

  /**
   * Set the API parameters.
   *
   * Parameters with value "undefined" are not included
   * in the API parameter set.
   */
  const setQueryParameters = (queryParameters: QueryParameters): void => {
    const nextQueryParameters = { ...queryParameters };

    // Remove entries with "undefined" values
    Object.keys(nextQueryParameters).forEach((key) => {
      if (nextQueryParameters[key] === undefined) {
        delete nextQueryParameters[key];
      }
    });

    router.push({
      query: nextQueryParameters,
      hash: router.currentRoute.value.hash,
    });
  };

  /**
   * Set the value for the parameter with the given name.
   *
   * If the new value is strictly "undefined", the parameter
   * will be removed from the API parameter set.
   */
  const updateQueryParameterValue = (
    name: string,
    value?: QueryParameterValue
  ): void => {
    const query = { ...router.currentRoute.value.query };

    if (value === undefined) {
      // The parameter is removed from the query if the value
      // is undefined.
      delete query[name];
    } else {
      // Set the parameter
      query[name] = value;
    }

    router.push({
      query,
      hash: router.currentRoute.value.hash,
    });
  };

  const result: ApiQuery = {
    currentQueryParameters,
    setQueryParameters,
    updateQueryParameterValue,

    install(app: App) {
      console.log('install', app);

      router = app.config.globalProperties.$router;
      const apiQueryHandler = this;
      app.provide(apiQueryHandlerKey, apiQueryHandler);
    },
  };

  return result;
};

export const useApiQuery = (): ApiQuery => inject(apiQueryHandlerKey)!;
