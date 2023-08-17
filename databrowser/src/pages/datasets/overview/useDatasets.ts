// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, computed, ref } from 'vue';
import { useMetaDataQuery } from '../../../domain/metaDataConfig/tourism/useMetaDataQuery';
import { TourismMetaData } from '../../../domain/metaDataConfig/tourism/types';
import { SelectOption } from '../../../components/select/types';
import { useI18n } from 'vue-i18n';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { generatedDatasetConfigSource } from '../../../domain/datasetConfig/source/generated';

export const useMetaDataDatasets = () => {
  const { t } = useI18n();

  const metaData = useMetaDataQuery();

  const metaDataDatasets = computed<TourismMetaData[]>(() => {
    const datasets = metaData.data?.value ?? [];
    if (currentAccessType.value === 'opendata') {
      return datasets.filter((dataset) => dataset.access === 'opendata');
    } else if (currentAccessType.value === 'limited') {
      return datasets.filter(
        (dataset) => dataset.access === 'limited' || dataset.access === 'closed'
      );
    }
    return datasets;
  });

  const currentAccessType = ref('all');

  const accessTypeOptions = computed<SelectOption[]>(() => [
    {
      label: t('overview.listPage.accessTypeAll'),
      value: 'all',
    },
    {
      label: t('overview.listPage.accessTypeOpen'),
      value: 'opendata',
    },
    {
      label: t('overview.listPage.accessTypeLimited'),
      value: 'limited',
    },
  ]);

  return {
    metaDataDatasets,
    accessTypeOptions,
    currentAccessType,
  };
};

export const useOtherDatasets = (metaDataDatasets: Ref<TourismMetaData[]>) => {
  const isOtherDatasetsLoading = ref(true);

  const datasetConfigs = ref<DatasetConfig[]>([]);

  const tourismDatasets = computed<TourismMetaData[]>(() =>
    datasetConfigs.value
      .map<TourismMetaData>((config) => ({
        id: config.route.pathParams.join('/'),
        access: 'unknown',
        description:
          config.description.description ?? 'No description available',
        shortname: config.description.title ?? '',
        output: 'json',
        swaggerUrl: 'https://api.tourism.testingmachine.eu/swagger/index.htm',
        externalLink: `${config.baseUrl}/${config.route.pathParams.join('/')}`,
        pathParam: config.route.pathParams,
        sources: ['No information available'],
        apiFilter: {},
        recordCount: {},
        hasNoMetadata: true,
      }))
      .sort((a, b) => a.shortname.localeCompare(b.shortname))
  );

  generatedDatasetConfigSource
    .getAllDatasetConfigs()
    .then((datasetConfigsByDomain) => {
      datasetConfigs.value = (datasetConfigsByDomain['tourism'] ?? {})
        .map((config) => {
          return config;
        })
        .filter((config) => config.route.pathParams.length > 1)
        // Filter out configs without table view
        .filter((config) => config.views?.table != null)
        // Check if pathParams are already contained in results
        .filter((config) => {
          const pathParams = config.route.pathParams;
          const pathParamsString = JSON.stringify(pathParams);
          const isContained = metaDataDatasets.value.some(
            (result) => JSON.stringify(result.pathParam) === pathParamsString
          );
          return !isContained;
        });

      isOtherDatasetsLoading.value = false;
    });

  return { tourismDatasets, isOtherDatasetsLoading };
};
