// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, Ref, watch } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import { buildOptions, mapToOptionsWithKeys, mapToOptionsWithKeysAndValues } from '../../utils/selectOptions/selectOptionsMapperUtils';

// The select options are provided as attributes of form
// "value_XXX" and "label_XXX"; they must be transformed in
// order to be usable by the select component
//
// Example: "value_001" with value "EC" and "label_001" with
// value "Eurac" are merged into the following SelectOption:
// {value: "EC", label: "Eurac"}
export const useAttributeMapper = (
  attrs: Ref<Record<string, unknown>>,
  sortByLabel: Ref<boolean>
) => {
  const options = ref<SelectOption[]>([]);

  watch(
    () => [attrs.value],
    () => {
      const optionsWithKeys = mapToOptionsWithKeys(attrs.value);
      const optionsWithKeysAndValues = mapToOptionsWithKeysAndValues(
        attrs.value,
        optionsWithKeys
      );

      options.value = buildOptions(optionsWithKeysAndValues, sortByLabel.value);
    },
    { immediate: true }
  );

  return { options };
};
