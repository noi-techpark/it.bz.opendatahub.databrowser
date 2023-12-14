// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, Ref, computed, toValue } from 'vue';
import { SelectOption } from '../../../../../components/select/types';
import { useApiRead } from '../../../../api/useApi';
import { useDatasetBaseInfoStore } from '../../../../datasets/config/store/datasetBaseInfoStore';
import { booleanOrStringToBoolean } from '../../../../utils/convertType';
import { RemoteOptionsMapper } from './types';
import { unwrapData } from '../../../../api/dataExtraction';

export const defaultOptionsMapper: RemoteOptionsMapper = (
  data,
  keySelector,
  labelSelector
) => {
  const { extractValueByPath } = useDatasetBaseInfoStore();

  return data.map((item) => {
    const value = extractValueByPath(item, keySelector) as string;
    const label = (extractValueByPath(item, labelSelector) as string) ?? value;
    return { value, label };
  });
};

export const useRemoteSelectOptions = <T extends SelectOption = SelectOption>(
  url: MaybeRef<string | undefined>,
  keySelector: MaybeRef<string | undefined>,
  labelSelector: MaybeRef<string | undefined>,
  sortByLabel: MaybeRef<string | boolean | undefined>,
  optionMapper = defaultOptionsMapper as RemoteOptionsMapper<T>
): {
  isLoading: Ref<boolean>;
  isSuccess: Ref<boolean>;
  isError: Ref<boolean>;
  error: Ref<unknown>;
  options: Ref<T[]>;
} => {
  const { data, isLoading, isSuccess, isError, error } =
    useApiRead<Record<string, string>[]>(url);

  const options = computed(() => {
    const keySelectorValue = toValue(keySelector);
    const labelSelectorValue = toValue(labelSelector);

    if (
      data.value == null ||
      keySelectorValue == null ||
      labelSelectorValue == null
    ) {
      return [];
    }

    const result = optionMapper(
      unwrapData(data.value),
      keySelectorValue,
      labelSelectorValue
    );

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
