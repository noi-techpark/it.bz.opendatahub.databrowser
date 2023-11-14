// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, Ref, computed, toValue } from 'vue';
import { useBaseAxiosFetch } from '../../../../api/client/axiosFetcher';
import { useDatasetInfoStore } from '../../../../datasetConfig/store/datasetInfoStore';
import { SelectOption } from '../../../../../components/select/types';
import { booleanOrStringToBoolean } from '../../../../../components/utils/props';
import { unwrapData } from '../../../../api/dataExtraction/dataExtraction';
import { RemoteOptionsMapper } from './types';

export const defaultOptionsMapper: RemoteOptionsMapper = (
  data,
  keySelector,
  labelSelector
) => {
  const { extractValueByPath } = useDatasetInfoStore();

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
  const { data, isLoading, isSuccess, isError, error } = useBaseAxiosFetch<
    Record<string, string>[]
  >(url, {
    afterFetch: (ctx) => unwrapData(ctx.data),
  });

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
      data.value,
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

    console.log('options', result);

    return result;
  });

  return { isLoading, isSuccess, isError, error, options };
};
