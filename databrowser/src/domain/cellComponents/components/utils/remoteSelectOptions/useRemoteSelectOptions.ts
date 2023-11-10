// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import { storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../../../datasetConfig/store/datasetInfoStore';
import { SelectOption } from '../../../../../components/select/types';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';

export const useRemoteSelectOptions = (
  url: MaybeRef<string | undefined>,
  keySelector: MaybeRef<string | undefined>,
  labelSelector: MaybeRef<string | undefined>,
  sortByLabel: MaybeRef<string | boolean | undefined>
) => {
  const { data, isLoading, isSuccess, isError, error } =
    useBaseAxiosFetch<Record<string, string>[]>(url);

  const { extractValueByPath } = storeToRefs(useDatasetInfoStore());

  const options = computed<SelectOption[]>(() => {
    const keySelectorValue = toValue(keySelector);
    const labelSelectorValue = toValue(labelSelector);

    if (
      data.value == null ||
      data.value == null ||
      keySelectorValue == null ||
      labelSelectorValue == null
    ) {
      return [];
    }

    const result = data.value.map<SelectOption>((item) => {
      const value = extractValueByPath.value(item, keySelectorValue) as string;
      const label =
        (extractValueByPath.value(item, labelSelectorValue) as string) ?? value;

      return { value, label };
    });

    const sortByLabelValue = booleanOrStringToBoolean(
      toValue(sortByLabel),
      true
    );

    if (sortByLabelValue) {
      result.sort((a, b) => a.label?.localeCompare(b.label));
    }

    return result;
  });

  return { isLoading, isSuccess, isError, error, options };
};
