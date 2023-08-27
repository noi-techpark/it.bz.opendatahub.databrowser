// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosResponse } from 'axios';
import { ref, Ref, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import * as R from 'ramda';
// import // replacePlaceholders,
// // useApiParameterReplacements,
// '../../../../api';
import { useApiParameterStore } from '../../../../api/service/apiParameterStore';
import { storeToRefs } from 'pinia';

export const useMapper = (
  data: Ref<undefined> | Ref<AxiosResponse<unknown[], any>>,
  keySelector: Ref<string>,
  labelSelector: Ref<string>,
  sortByLabel: Ref<boolean>
) => {
  const options = ref<SelectOption[]>([]);

  // const replacements = useApiParameterReplacements();
  const { allApiParams } = storeToRefs(useApiParameterStore());

  watch(
    () => [data.value, allApiParams.value],
    () => {
      if (data.value == null) {
        return;
      }

      const { replaceWithApiParams } = useApiParameterStore();
      // Compute key and value selectors with replacements (e.g. current language)
      // const replace = (s: string): string =>
      //   replacePlaceholders(s, replacements.value);
      const keySelectorWithReplacements = replaceWithApiParams(
        keySelector.value
      );
      const labelSelectorWithReplacements = replaceWithApiParams(
        labelSelector.value
      );

      options.value = data.value.data.map((item) => {
        const value = getPropertyValue(item, keySelectorWithReplacements);
        const label = getPropertyValue(item, labelSelectorWithReplacements);
        return {
          value,
          label: label ?? value,
        };
      });

      if (sortByLabel) {
        options.value.sort((a, b) => a.label?.localeCompare(b.label));
      }
    },
    { immediate: true }
  );

  return { options };
};

const getPropertyValue = (item: unknown, jsonPath: string) => {
  const path = jsonPath.split('.');
  const lensePath = R.lensPath(path);
  return R.view(lensePath, item);
};
