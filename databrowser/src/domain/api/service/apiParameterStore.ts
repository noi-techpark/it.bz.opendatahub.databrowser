// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ApiParams } from './types';

export const useApiParameterStore = defineStore('apiParameterStore', () => {
  const currentApiParams = ref<ApiParams>({});
  const defaultApiParams = ref<ApiParams>({});

  const allApiParams = computed(
    () => {
      console.log('allApiParams', {
        ...defaultApiParams.value,
        ...currentApiParams.value,
      });

      return {
        ...defaultApiParams.value,
        ...currentApiParams.value,
      };
    },
    {
      onTrigger(event) {
        console.warn('### TRIGGER allApiParams', event, {
          ...defaultApiParams.value,
          ...currentApiParams.value,
        });
      },
    }
  );

  // Get all API parameters whose key / value is not set in default parameters
  // This is used to remove all default parameters from the URL query
  const nonDefaultApiParams = computed(() =>
    Object.entries(allApiParams.value)
      // Remove all entries where value === default value
      .filter(([key, value]) => defaultApiParams.value[key] !== value)
      .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
  );

  // Replace all placeholders in a string with the corresponding API parameter
  const replaceWithApiParams = (s: string): string =>
    s.replace(/\{([^}]+)\}/g, (_, paramName) => allApiParams.value[paramName]);

  // Utility function to replace all placeholders in an object with the
  // corresponding API parameter
  const replaceFields = (fields?: Record<string, string>) => {
    return fields == null
      ? {}
      : Object.entries(fields).reduce<Record<string, string>>(
          (prev, [key, value]) => ({
            ...prev,
            [key]: replaceWithApiParams(value),
          }),
          {}
        );
  };

  return {
    allApiParams,
    currentApiParams,
    defaultApiParams,
    nonDefaultApiParams,
    replaceWithApiParams,
    replaceFields,
  };
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useApiParameterStore, import.meta.hot)
  );
}
