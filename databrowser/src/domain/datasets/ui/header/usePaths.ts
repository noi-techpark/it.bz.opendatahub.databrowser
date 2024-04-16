// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { computed, MaybeRef, toValue } from 'vue';
import { RouteLocationNamedRaw, useRouter } from 'vue-router';
import { DatasetPage } from '../../../../routes';
import { useMetaDataStore } from '../../../metaDataConfig/tourism/metaDataStore';
import { PathSegments } from '../../config/types';
import { useDatasetQueryStore } from '../../location/store/datasetQueryStore';

// TODO: make this file a store?

export const usePaths = () => {
  const datasetOverviewForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() => ({
      name: 'OverviewDetailPage',
      params: { id: toValue(id) },
    }));

  const tableViewPathForId = (pathSegments: MaybeRef<PathSegments>) =>
    computed<RouteLocationNamedRaw>(() => ({
      name: DatasetPage.TABLE,
      params: {
        domain: 'tourism',
        pathSegments: toValue(pathSegments),
      },
    }));

  return {
    datasetOverviewForId,
    tableViewPathForId,
  };
};

export const usePathsForCurrentRoute = () => {
  const { buildPath, buildPathForId } = initPathBuilder();

  const detailViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.DETAIL)
  );
  const rawViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.RAW)
  );
  const editViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.EDIT)
  );
  const tableViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.TABLE, false)
  );
  const newViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.NEW, false)
  );

  const detailViewPathForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.DETAIL, toValue(id))
    );
  const rawViewPathForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.RAW, toValue(id))
    );
  const editViewPathForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.EDIT, toValue(id))
    );
  const tableViewPathForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.TABLE, toValue(id), false)
    );
  const newViewPathForId = (id: MaybeRef<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.NEW, toValue(id), false)
    );

  return {
    detailViewPath,
    rawViewPath,
    editViewPath,
    tableViewPath,
    newViewPath,
    detailViewPathForId,
    rawViewPathForId,
    editViewPathForId,
    tableViewPathForId,
    newViewPathForId,
  };
};

const initPathBuilder = () => {
  const { currentMetaData } = storeToRefs(useMetaDataStore());
  const currentLanguage = useDatasetQueryStore().handle('language');
  const router = useRouter();

  const buildPath = (
    name: string,
    preserveHash: boolean = true
  ): RouteLocationNamedRaw => ({
    name: name,
    query: {
      ...currentMetaData.value?.apiFilter,
      language: currentLanguage.value,
    },
    hash: preserveHash ? router.currentRoute.value.hash : undefined,
  });

  const buildPathForId = (
    name: string,
    id: string,
    preserveHash: boolean = true
  ) => ({
    ...buildPath(name, preserveHash),
    params: { id },
  });

  return { buildPath, buildPathForId };
};
