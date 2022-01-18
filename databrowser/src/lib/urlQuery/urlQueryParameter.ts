import { LocationQuery, useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { UseUrlQueryParameter } from './types';

const getCurrentUrlQueryParameterValue = (
  query: LocationQuery,
  name: string,
  defaultValue?: string
): string | undefined => {
  const queryValue = query[name];

  if (queryValue == null) {
    return defaultValue;
  }

  return Array.isArray(queryValue)
    ? queryValue.join(',')
    : queryValue?.toString();
};

export const useUrlQueryParameter: UseUrlQueryParameter = function (
  name,
  value,
  config
) {
  const router = useRouter();
  const route = useRoute();

  const { defaultValue } = config ?? {};

  const firstValue = getCurrentUrlQueryParameterValue(route.query, name, value);
  const parameterValue = ref(firstValue);

  watch(
    () => route.query,
    (query) => {
      const queryValue = query[name];

      const nextValue = getCurrentUrlQueryParameterValue(
        route.query,
        name,
        value
      );

      parameterValue.value = nextValue;
    }
  );

  watch(
    () => parameterValue.value,
    (nextValue) => {
      const params = {
        ...router.currentRoute.value.query,
      };

      if (nextValue === defaultValue || nextValue === undefined) {
        delete params[name];
      } else {
        params[name] = nextValue;
      }

      router.push({
        query: params,
        hash: router.currentRoute.value.hash,
      });
    },
    { immediate: true }
  );

  return parameterValue;
};
