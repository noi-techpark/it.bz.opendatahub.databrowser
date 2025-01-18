// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { AllInOneDataset, MapSourceWithState, MarkerFeature } from './types';

export const useMapViewRouting = (
  datasets: Ref<AllInOneDataset[]>,
  recordsByDatasetId: Ref<Record<string, MapSourceWithState>>,
  selectedDatasetIds: Ref<Set<string>>,
  activeMarker: Ref<MarkerFeature | undefined>,
  showMarkerDetail: Ref<boolean>
) => {
  const router = useRouter();

  const languageFromUrl = computed(
    () => router.currentRoute.value.query.language as string | undefined
  );
  const datasetIdFromUrl = computed(
    () => router.currentRoute.value.query.datasetId as string | undefined
  );
  const recordIdFromUrl = computed(
    () => router.currentRoute.value.query.recordId as string | undefined
  );

  watch(
    [datasetIdFromUrl, recordIdFromUrl, datasets, recordsByDatasetId],
    ([
      datasetIdFromUrlValue,
      recordIdFromUrlValue,
      datasetsValue,
      recordsByDatasetIdValue,
    ]) => {
      const datasetId = datasetIdFromUrlValue as string;
      const recordId = recordIdFromUrlValue as string;

      if (datasetId == null) {
        console.debug('No datasetId in URL');
        return;
      }

      selectedDatasetIds.value = new Set(selectedDatasetIds.value);
      selectedDatasetIds.value.add(datasetId as string);

      if (recordId == null) {
        console.debug('No recordId in URL');
        return;
      }

      const dataset = datasetsValue.find((d) => d.dataset.id === datasetId);
      if (dataset == null) {
        console.debug(`Dataset with ID ${datasetId} not found`);
        return;
      }

      const record = recordsByDatasetIdValue[
        datasetId
      ]?.mapSource?.data.features.find(
        (f) => f.properties.recordId === recordId
      );
      if (record == null) {
        console.debug(
          `Record with ID ${recordId} for dataset ID ${datasetId} not found`
        );
        return;
      }

      console.debug('Show record detail for record ID', recordId);

      activeMarker.value = {
        id: recordId,
        datasetId: datasetId,
        name: record.properties.recordName,
        abbreviation: dataset.mapMetaData.datasetAbbreviation,
        color: dataset.mapMetaData.datasetColor,
      };
      showMarkerDetail.value = true;
    },
    { immediate: true }
  );

  const setUrlParams = (datasetId?: string, recordId?: string) => {
    const query = { ...router.currentRoute.value.query, datasetId, recordId };
    router.push({ query });
  };

  const closeMapView = () => {
    const query = { ...router.currentRoute.value.query };
    delete query.datasetId;
    delete query.recordId;
    delete query.map;
    router.push({ query });
  };

  return {
    languageFromUrl,
    setUrlParams,
    closeMapView,
  };
};
