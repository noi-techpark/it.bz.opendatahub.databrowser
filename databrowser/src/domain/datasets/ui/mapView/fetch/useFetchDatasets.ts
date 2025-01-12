// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, ref, watch } from 'vue';
import { useMetaDataForAllDatasets } from '../../../../../pages/datasets/overview/useDatasets';
import { TourismMetaData } from '../../../../metaDataConfig/tourism/types';
import { AllInOneDataset } from '../types';
import { ApiType } from '../../../../metaDataConfig/types';

type RestrictedMetaData = TourismMetaData & {
  apiType: Exclude<ApiType, 'unknown'>;
  externalLink: string;
};

export const useFetchDatasets = (): {
  datasets: Ref<AllInOneDataset[]>;
  isLoading: Ref<boolean>;
} => {
  const datasets = ref<AllInOneDataset[]>([]);

  const { metaData, isMetaDataLoading } = useMetaDataForAllDatasets();

  watch(metaData, (metaDataValue) => {
    // Only use valid datasets, i.e. those with a known API type and an external link
    // TODO: remove all datasets without GPS info
    datasets.value = metaDataValue
      .filter((dataset): dataset is RestrictedMetaData => {
        if (dataset.apiType === 'unknown') {
          console.warn(
            `Dataset ${dataset.id} has unknown API type and will be ignored`
          );
          return false;
        }
        if (dataset.externalLink == null) {
          console.warn(
            `Dataset ${dataset.id} has no external link and will be ignored`
          );
          return false;
        }
        return true;
      })
      .map(buildDataset);
  });

  return {
    datasets,
    isLoading: isMetaDataLoading,
  };
};

const buildDataset = (dataset: RestrictedMetaData): AllInOneDataset => ({
  dataset: {
    id: dataset.id,
    name: dataset.shortname,
    apiType: dataset.apiType,
    url: dataset.externalLink,
    parentId: dataset.parent?.id,
  },
  mapMetaData: {
    datasetId: dataset.id,
    datasetName: dataset.shortname,
    datasetAbbreviation: dataset.shortname.substring(0, 1).toUpperCase(),
    datasetColor: stringToColor(dataset.id),
  },
});

const stringToColor = (s: string, saturation = 100, lightness = 75) => {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};
