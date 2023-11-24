// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationRaw, stringifyQuery, useLink } from 'vue-router';
import {
  DatasetDomain,
  DatasetId,
  DatasetPath,
  DatasetQuery,
} from '../../datasetConfig/types';
import {
  DomainWithOpenApiDocument,
  domainIsKnownToHaveOpenApiDocument,
  domainWithOpenApiDocument,
} from '../../openApi';
import { DatasetPage } from '../../../routes';
import { DeepReadonly, MaybeRef, toRefs, toValue } from 'vue';
import { reactiveComputed } from '@vueuse/core';

export const computeApiBaseUrl = (domain: DomainWithOpenApiDocument) =>
  domainWithOpenApiDocument[domain].baseUrl;

export const computeApiPath = (path: DatasetPath) => path.join('/');

export const computeApiFullUrl = (
  domain: DomainWithOpenApiDocument,
  path: DatasetPath,
  id: DatasetId | undefined,
  query: DatasetQuery | undefined
) => {
  const baseUrl = computeApiBaseUrl(domain);
  const pathString = computeApiPath(path);
  const idString = id == null ? '' : `/${id}`;
  const queryString = query == null ? '' : `?${stringifyQuery(query.raw)}`;
  return `${baseUrl}/${pathString}${idString}${queryString}`;
};

export const computeRecordId = (
  domain: DatasetDomain | undefined,
  record: any
) => {
  if (record == null || Array.isArray(record)) {
    return undefined;
  }

  switch (domain) {
    case 'tourism': {
      return record.id ?? record.Id;
    }
    case 'mobility': {
      return record.scode ?? record.id;
    }
    default: {
      return record.id;
    }
  }
};

export const computeDatasetRouteLocations = (
  datasetDomain: DatasetDomain | undefined,
  datasetPath: DatasetPath | undefined,
  datasetQuery: DatasetQuery | undefined,
  record: any
): {
  tableLocation: RouteLocationRaw | undefined;
  detailLocation: RouteLocationRaw | undefined;
  editLocation: RouteLocationRaw | undefined;
  newLocation: RouteLocationRaw | undefined;
  rawLocation: RouteLocationRaw | undefined;
  quickLocation: RouteLocationRaw | undefined;
} => {
  if (
    datasetDomain == null ||
    !domainIsKnownToHaveOpenApiDocument(datasetDomain) ||
    datasetPath == null
  ) {
    return {
      tableLocation: undefined,
      detailLocation: undefined,
      editLocation: undefined,
      newLocation: undefined,
      rawLocation: undefined,
      quickLocation: undefined,
    };
  }

  const params = {
    domain: datasetDomain,
    pathSegments: datasetPath,
  };

  const tableLocation: RouteLocationRaw = {
    name: DatasetPage.TABLE,
    params,
    query: datasetQuery?.raw,
  };

  if (record == null || Array.isArray(record)) {
    return {
      tableLocation,
      detailLocation: undefined,
      editLocation: undefined,
      newLocation: undefined,
      rawLocation: undefined,
      quickLocation: undefined,
    };
  }

  const recordId = computeRecordId(datasetDomain, record);

  const singleRecordParams =
    datasetDomain === 'tourism'
      ? { ...params, id: recordId }
      : record.scode == null
      ? { ...params, id: recordId }
      : params;

  const singleRecordQuery =
    datasetDomain === 'tourism'
      ? { language: datasetQuery?.raw.language }
      : record.scode == null
      ? {}
      : { where: `scode.eq.${recordId}` };

  const singleRecordLocation: RouteLocationRaw = {
    params: singleRecordParams,
    query: singleRecordQuery,
  };

  const detailLocation: RouteLocationRaw = {
    ...singleRecordLocation,
    name: DatasetPage.DETAIL,
  };
  const editLocation: RouteLocationRaw = {
    ...singleRecordLocation,
    name: DatasetPage.EDIT,
  };
  const newLocation: RouteLocationRaw = {
    ...singleRecordLocation,
    name: DatasetPage.NEW,
  };
  const rawLocation: RouteLocationRaw = {
    ...singleRecordLocation,
    name: DatasetPage.RAW,
  };
  const quickLocation: RouteLocationRaw = {
    ...singleRecordLocation,
    name: DatasetPage.QUICK,
  };

  return {
    tableLocation,
    detailLocation,
    editLocation,
    newLocation,
    rawLocation,
    quickLocation,
  };
};

export const computeDatasetRouteLinks = (
  datasetDomain: DatasetDomain | undefined,
  datasetPath: DatasetPath | undefined,
  datasetQuery: DatasetQuery | undefined,
  record: any
): {
  tableLink: ReturnType<typeof useLink> | undefined;
  detailLink: ReturnType<typeof useLink> | undefined;
  editLink: ReturnType<typeof useLink> | undefined;
  newLink: ReturnType<typeof useLink> | undefined;
  rawLink: ReturnType<typeof useLink> | undefined;
  quickLink: ReturnType<typeof useLink> | undefined;
} => {
  const {
    tableLocation,
    detailLocation,
    editLocation,
    newLocation,
    rawLocation,
    quickLocation,
  } = computeDatasetRouteLocations(
    datasetDomain,
    datasetPath,
    datasetQuery,
    record
  );

  return {
    tableLink: tableLocation ? useLink({ to: tableLocation }) : undefined,
    detailLink: detailLocation ? useLink({ to: detailLocation }) : undefined,
    editLink: editLocation ? useLink({ to: editLocation }) : undefined,
    newLink: newLocation ? useLink({ to: newLocation }) : undefined,
    rawLink: rawLocation ? useLink({ to: rawLocation }) : undefined,
    quickLink: quickLocation ? useLink({ to: quickLocation }) : undefined,
  };
};

export const useDatasetRouteLinks = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DeepReadonly<DatasetPath | undefined>>,
  datasetQuery: MaybeRef<DeepReadonly<DatasetQuery | undefined>>,
  record: MaybeRef<any>
) => {
  const result = reactiveComputed(() => {
    const datasetDomainValue = toValue(datasetDomain);
    const datasetPathValue = toValue(datasetPath) as DatasetPath;
    const datasetQueryValue = toValue(datasetQuery) as DatasetQuery;
    const recordValue = toValue(record);

    const { tableLink, detailLink, editLink, newLink, rawLink, quickLink } =
      computeDatasetRouteLinks(
        datasetDomainValue,
        datasetPathValue,
        datasetQueryValue,
        recordValue
      );

    return {
      tableLink,
      detailLink,
      editLink,
      newLink,
      rawLink,
      quickLink,
    };
  });

  return toRefs(result);
};
