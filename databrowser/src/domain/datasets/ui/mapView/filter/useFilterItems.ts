// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import { AllInOneDataset, MapSourceWithState } from '../types';
import { SelectDatasetItem } from './types';

export const useFilterItems = (
  datasets: Ref<AllInOneDataset[]>,
  sourceWithState: Ref<Record<string, MapSourceWithState>>,
  selectedDatasets: Ref<Set<string>>
) => {
  return computed<SelectDatasetItem[]>(() => {
    // Split datasets into parent and child datasets
    const parentDatasets = datasets.value.filter(
      (d) => d.dataset.parentId == null
    );
    const childDatasets = datasets.value.filter(
      (d) => d.dataset.parentId != null
    );

    // Build dataset fetch objects
    const datasetsByParent = parentDatasets.reduce<
      Record<string, SelectDatasetItem>
    >((prev, curr) => {
      prev[curr.dataset.id] = {
        ...buildItem(curr, sourceWithState.value, selectedDatasets.value),
        children: childDatasets
          .filter(
            (childDataset) => childDataset.dataset.parentId === curr.dataset.id
          )
          .map((childDataset) =>
            buildItem(
              childDataset,
              sourceWithState.value,
              selectedDatasets.value
            )
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      };
      return prev;
    }, {});

    return Object.values(datasetsByParent).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  });
};

const buildItem = (
  dataset: AllInOneDataset,
  sourceWithState: Record<string, MapSourceWithState>,
  selectedDatasets: Set<string>
) => {
  const id = dataset.dataset.id;
  const source = sourceWithState[id];
  return {
    id,
    name: dataset.dataset.name,
    fetching: source?.fetchState.fetching ?? false,
    fetched: source?.fetchState.fetched ?? false,
    error: source?.fetchState.error ?? null,
    count: source?.mapSource?.data.features.length ?? 0,
    color: dataset.mapMetaData.datasetColor,
    selected: selectedDatasets.has(dataset.dataset.id) ?? false,
    children: [],
  };
};
