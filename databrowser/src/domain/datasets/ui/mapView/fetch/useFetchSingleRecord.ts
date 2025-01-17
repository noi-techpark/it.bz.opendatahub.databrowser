// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, ComputedRef, Ref } from 'vue';
import { useApiRead } from '../../../../api/useApi';
import { ApiType } from '../../../../metaDataConfig/types';
import { toError } from '../../../../utils/convertError';

export const useFetchSingleRecord = (
  apiType: Ref<ApiType | undefined>,
  externalLink: Ref<string | undefined>,
  recordId: Ref<string | undefined>
) => {
  const recordUrl = useRecordUrl(apiType, externalLink, recordId);

  const options = computed(() => ({
    withAuth: true,
    apiType: apiType.value,
  }));

  const apiReadResult = useApiRead<Record<string, unknown>>(recordUrl, options);

  const recordData = computed(() => {
    if (apiReadResult.data.value == null) {
      return {};
    }

    switch (apiType.value) {
      case 'unknown':
        return apiReadResult.data.value;
      case 'content':
        return apiReadResult.data.value;
      case 'timeseries':
        return Array.isArray(apiReadResult.data.value.data)
          ? apiReadResult.data.value.data[0]
          : apiReadResult.data.value;
      default:
        return {};
    }
  });

  return { recordUrl, recordData, ...apiReadResult };
};

const useRecordUrl = (
  apiType: Ref<ApiType | undefined>,
  externalLink: Ref<string | undefined>,
  recordId: Ref<string | undefined>
): ComputedRef<string | undefined> => {
  return computed(() => {
    if (apiType.value === 'unknown' || externalLink.value == null) {
      console.error(
        'Dataset has no external link, not able to fetch details',
        externalLink.value
      );
      return;
    }

    try {
      // Remove all query parameters from API url
      const url = new URL(externalLink.value);
      for (const key of url.searchParams.keys()) {
        url.searchParams.delete(key);
      }

      if (apiType.value === 'content') {
        return `${url.toString()}/${recordId.value}`;
      } else if (apiType.value === 'timeseries') {
        return `${url.toString()}?scode=${recordId.value}`;
      }
    } catch (error) {
      const errorMessage = toError(error).message;
      console.error(errorMessage, externalLink.value);
    }

    return undefined;
  });
};
