// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref, unref } from 'vue';
import { RouteLocationNamedRaw, useRouter } from 'vue-router';
import { DatasetPage } from '../../../routes';
import { useMetaDataForCurrentRoute } from '../../metaDataConfig/tourism/useMetaData';
import { apiParameters } from '../../api/service/apiParameterHandler';

export const usePaths = () => {
  const datasetOverviewForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() => ({
      name: 'OverviewDetailPage',
      params: { id: unref(id) },
    }));

  const tableViewPathForId = (pathParams: string[] | Ref<string[]>) =>
    computed<RouteLocationNamedRaw>(() => ({
      name: DatasetPage.TABLE,
      params: {
        domain: 'tourism',
        pathParams: unref(pathParams),
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
  const quickViewPath = computed<RouteLocationNamedRaw>(() =>
    buildPath(DatasetPage.QUICK)
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

  const detailViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.DETAIL, unref(id))
    );
  const quickViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.QUICK, unref(id))
    );
  const rawViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.RAW, unref(id))
    );
  const editViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.EDIT, unref(id))
    );
  const tableViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.TABLE, unref(id), false)
    );
  const newViewPathForId = (id: string | Ref<string>) =>
    computed<RouteLocationNamedRaw>(() =>
      buildPathForId(DatasetPage.NEW, unref(id), false)
    );

  return {
    detailViewPath,
    quickViewPath,
    rawViewPath,
    editViewPath,
    tableViewPath,
    newViewPath,
    detailViewPathForId,
    quickViewPathForId,
    rawViewPathForId,
    editViewPathForId,
    tableViewPathForId,
    newViewPathForId,
  };
};

const initPathBuilder = () => {
  const { currentMetaData } = useMetaDataForCurrentRoute();
  const router = useRouter();

  const buildPath = (
    name: string,
    preserveHash: boolean = true
  ): RouteLocationNamedRaw => ({
    name: name,
    query: {
      ...currentMetaData.value?.apiFilter,
      language: apiParameters.language.value,
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
