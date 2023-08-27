// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { useApiParameterStore } from './apiParameterStore';

export const useReplaceWithApiParamsStore = defineStore(
  'replaceWithApiParamsStore',
  () => {
    const { allApiParams } = storeToRefs(useApiParameterStore());

    const replace = (s: string): string => {
      const replacements = allApiParams.value;
      if (replacements == null) {
        return s;
      }

      return Object.keys(replacements).reduce(
        (prev, curr) => prev.replace(`{${curr}}`, replacements[curr]),
        s
      );
    };

    return { replace };
  }
);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useReplaceWithApiParamsStore, import.meta.hot)
  );
}
