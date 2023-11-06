// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Domain } from '../../datasetConfig/types';
import { domainIsKnownToHaveOpenApiDocument } from '../../openApi';
import { ChangePaginationWithQuery, PaginationWithCallback } from './types';
import { mobilityPaginationProvider } from './provider/mobilityPaginationProvider';
import { tourismPaginationProvider } from './provider/tourismPaginationProvider';
import { staticPaginationProvider } from './provider/staticPaginationProvider';
import { MaybeRef, toRefs, toValue } from 'vue';
import { reactiveComputed } from '@vueuse/core';
import { useRouter } from 'vue-router';

interface ComputePagination {
  compute: (data: unknown) => PaginationWithCallback;
}

export const computePagination = (
  domain: Domain | undefined,
  query: Record<string, string> | undefined,
  changeRouteQuery: ChangePaginationWithQuery
): ComputePagination => {
  if (!domainIsKnownToHaveOpenApiDocument(domain)) {
    console.error(
      `No pagination implementation found for domain ${domain}, returning identity function`
    );
    return { compute: staticPaginationProvider() };
  }

  switch (domain) {
    case 'tourism': {
      return { compute: tourismPaginationProvider(query, changeRouteQuery) };
    }
    case 'mobility': {
      return { compute: mobilityPaginationProvider(changeRouteQuery) };
    }
  }
};

export const useComputePagination = (
  domain: MaybeRef<Domain | undefined>,
  query: MaybeRef<Record<string, string> | undefined>,
  changeRouteQuery: ChangePaginationWithQuery
) => {
  const result = reactiveComputed(() =>
    computePagination(toValue(domain), toValue(query), changeRouteQuery)
  );

  return toRefs(result);
};

export const useComputePaginationWithRouter = (
  domain: MaybeRef<Domain | undefined>,
  query: MaybeRef<Record<string, string> | undefined>
) => {
  const router = useRouter();

  const changePagination: ChangePaginationWithQuery = (query) => {
    const route = router.currentRoute.value;
    return router.push({ ...route, query: { ...route.query, ...query } });
  };

  return useComputePagination(domain, query, changePagination);
};
