import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { QueryParameters, UseUrlQueryRouter } from './types';

export const useUrlQueryRouter: UseUrlQueryRouter = function (config) {
  const { defaultQueryParameters } = config || {};

  const router = useRouter();

  const updateQuery = (queryParameters: QueryParameters) => {
    const params = {
      ...router.currentRoute.value.query,
    };

    for (const parameter in queryParameters) {
      if (
        defaultQueryParameters &&
        defaultQueryParameters[parameter] === queryParameters[parameter]
      ) {
        delete params[parameter];
      } else {
        params[parameter] = queryParameters[parameter].toString();
      }
    }

    router.push({
      query: params,
    });
  };

  const clear = () => {
    const params = {
      ...router.currentRoute.value.query,
    };

    for (const parameter in defaultQueryParameters) {
      delete params[parameter];
    }

    router.push({
      query: params,
    });
  };

  const route = useRoute();

  const queryParameters = ref();
  const queryParametersWithDefaults = ref();

  watch(
    () => route.query,
    (query) => {
      queryParameters.value = query;
      queryParametersWithDefaults.value = {
        ...defaultQueryParameters,
        ...query,
      };
    },
    { immediate: true }
  );

  return reactive({
    queryParameters,
    queryParametersWithDefaults,
    actions: {
      updateQuery,
      clear,
    },
  });
};
