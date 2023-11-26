// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, toRefs, toValue } from 'vue';
import { RouteLocationRaw, Router, useRouter } from 'vue-router';
import {
  DatasetDomain,
  DatasetPath,
  DatasetQuery,
} from '../../datasetConfig/types';
import { computeDatasetLocations } from './datasetLocation';
import { DatasetLocationRouteLink } from './types';

const toRouteLink = (
  location: RouteLocationRaw | undefined,
  router: Router
): DatasetLocationRouteLink => {
  if (location == null) {
    return { navigate: () => {} };
  }

  const { href } = router.resolve(location);
  const navigate = () => router.push(location);

  return { href, navigate };
};

export const useDatasetRouteLinks = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DatasetPath | undefined>,
  datasetQuery: MaybeRef<DatasetQuery | undefined>,
  record?: MaybeRef<any>
) => {
  const router = useRouter();

  const result = reactiveComputed(() => {
    const locations = computeDatasetLocations(
      toValue(datasetDomain),
      toValue(datasetPath) as DatasetPath,
      toValue(datasetQuery)?.raw as DatasetQuery['raw'],
      toValue(record)
    );

    return {
      tableLink: toRouteLink(locations.tableLocation, router),
      detailLink: toRouteLink(locations.detailLocation, router),
      editLink: toRouteLink(locations.editLocation, router),
      newLink: toRouteLink(locations.newLocation, router),
      rawLink: toRouteLink(locations.rawLocation, router),
      quickLink: toRouteLink(locations.quickLocation, router),
    };
  });

  return toRefs(result);
};
