// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import { useApiRead } from '../../../../api/useApi';
import { TourismMetaData } from '../../../../metaDataConfig/tourism/types';
import { MarkerFeature } from '../types';
import { toError } from '../../../../utils/convertError';

export const useFetchSingleRecord = (
  currentDataset: Ref<TourismMetaData | undefined>,
  featureProps: Ref<MarkerFeature | undefined>
) => {
  const apiType = computed(() => currentDataset.value?.apiType);

  const recordUrl = computed(() => {
    const dataset = currentDataset.value;

    if (dataset == null) {
      return;
    }

    if (apiType.value === 'unknown' || dataset.externalLink == null) {
      console.error(
        'Dataset has no external link, not able to fetch details',
        dataset
      );
      return;
    }

    try {
      // Remove all query parameters
      const url = new URL(dataset.externalLink);
      for (const key of url.searchParams.keys()) {
        url.searchParams.delete(key);
      }

      if (apiType.value === 'content') {
        return `${url.toString()}/${featureProps.value?.id}`;
      } else if (apiType.value === 'timeseries') {
        return `${url.toString()}?scode=${featureProps.value?.id}`;
      } else {
        return;
      }
    } catch (error) {
      console.error(toError(error).message, dataset.externalLink);
      return undefined;
    }
  });

  const options = computed(() => ({
    withAuth: true,
    apiType: apiType.value,
  }));

  const recordRead = useApiRead<Record<string, unknown>>(recordUrl, options);

  return { recordUrl, ...recordRead };
};
