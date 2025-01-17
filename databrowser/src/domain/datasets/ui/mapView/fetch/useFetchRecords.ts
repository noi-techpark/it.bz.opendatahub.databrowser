// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useQueries, useQueryClient } from '@tanstack/vue-query';
import { computed, onUnmounted, ref, Ref } from 'vue';
import { axiosWithMaybeAuth } from '../../../../api/apiAuth';
import { unwrapData } from '../../../../api/dataExtraction';
import { toError } from '../../../../utils/convertError';
import { AllInOneDataset, MapSource, MapSourceWithState } from '../types';
import { computeMapSource } from './computeMapSource';
import { FetchState } from './types';
import {
  buildErrorFetchState,
  buildFinishFetchState,
  buildStartFetchState,
} from './fetchState';

export const useFetchRecords = (
  selectedDatasets: Ref<AllInOneDataset[]>
): Ref<Record<string, MapSourceWithState>> => {
  const result: Ref<Record<string, MapSourceWithState>> = ref({});

  useQueries({
    queries: computed(() =>
      selectedDatasets.value.map((dataset) => ({
        queryKey: ['mapData', dataset.dataset.id],
        queryFn: async () => await fetchAndBuildMapSource(dataset, result),
        // refetchOnWindowFocus: false,
        // Data is stale after 10 minutes
        staleTime: 10 * 60 * 1000,
        retry: 0,
      }))
    ),
  });

  onUnmounted(() => {
    // Invalidate mapData queries when component is unmounted, because
    // - the data is not shown anymore when the map view is opened again
    // - the data is not needed anymore
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ['mapData'] });
  });

  return result;
};

const fetchAndBuildMapSource = async (
  dataset: AllInOneDataset,
  result: Ref<Record<string, { mapSource?: MapSource; fetchState: FetchState }>>
): Promise<MapSource | undefined> => {
  const datasetId = dataset.dataset.id;

  // Initialize fetch state if not present
  if (result.value[datasetId] == null) {
    result.value = {
      ...result.value,
      [datasetId]: {
        fetchState: buildStartFetchState(),
      },
    };
  }

  try {
    const records = await fetchRecords(dataset);
    const mapSource = computeMapSource(dataset.dataset.apiType, records);

    // Update fetch state with result
    result.value = {
      ...result.value,
      [datasetId]: {
        mapSource,
        fetchState: buildFinishFetchState(),
      },
    };
    return mapSource;
  } catch (error: unknown) {
    console.error('Error while fetching records', error);

    // Update fetch state with error
    result.value = {
      ...result.value,
      [datasetId]: {
        fetchState: buildErrorFetchState(toError(error).message),
      },
    };
  }
};

const fetchRecords = async (dataset: AllInOneDataset): Promise<unknown[]> => {
  const fetchUrl = getFetchUrl(dataset.dataset.apiType, dataset.dataset.url);
  const axiosInstance = await axiosWithMaybeAuth(true, dataset.dataset.apiType);
  const responseData = await axiosInstance.get<unknown>(fetchUrl);
  return unwrapData<unknown[]>(responseData.data);
};

const getFetchUrl = (
  apiType: AllInOneDataset['dataset']['apiType'],
  url: AllInOneDataset['dataset']['url']
): string => {
  switch (apiType) {
    case 'content':
      return `${url}?pagesize=1000000&fields=Id,GpsInfo,Shortname`;
    case 'timeseries':
      return `${url}?limit=1000000`;
  }
};
