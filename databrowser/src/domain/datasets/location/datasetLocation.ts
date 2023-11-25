// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetPage } from '../../../routes';
import { computeRecordId } from '../../data/utils';
import {
  DatasetDomain,
  DatasetPath,
  DatasetQuery,
} from '../../datasetConfig/types';
import { DatasetLocations, DatasetLocationRoute } from './types';
import { DeepReadonly, MaybeRef, computed, toRefs, toValue } from 'vue';
import { reactiveComputed } from '@vueuse/core';

export const computeTableLocation = (
  domain: string | undefined,
  pathSegments: DatasetPath | undefined,
  query: DatasetQuery['raw'] | undefined = {}
): DatasetLocationRoute => {
  // Check if it is possible to compute the locations at all
  if (domain == null || pathSegments == null) {
    return {};
  }
  return { params: { domain, pathSegments }, query };
};

export const computeSingleRecordLocations = (
  domain: string | undefined,
  pathSegments: DatasetPath | undefined,
  query: DatasetQuery['raw'] | undefined = {},
  record?: any
): Omit<DatasetLocations, 'tableLocation'> => {
  // Check if it is possible to compute the locations at all
  if (domain == null || pathSegments == null) {
    return {};
  }

  const id = computeRecordId(domain, record);

  // Check if it is possible to compute the locations at all
  if (id == null) {
    return {};
  }

  const params = { domain, pathSegments };

  const singleRecordParams = domain === 'tourism' ? { ...params, id } : params;

  const singleRecordQuery: Record<string, string | (string | null)[] | null> =
    domain === 'tourism'
      ? { language: query.language }
      : { where: `scode.eq.${id}` };

  const singleRecordLocation = {
    params: singleRecordParams,
    query: singleRecordQuery,
  };

  return {
    detailLocation: { ...singleRecordLocation, name: DatasetPage.DETAIL },
    editLocation: { ...singleRecordLocation, name: DatasetPage.EDIT },
    newLocation: { ...params, name: DatasetPage.NEW },
    rawLocation: { ...singleRecordLocation, name: DatasetPage.RAW },
    quickLocation: { ...singleRecordLocation, name: DatasetPage.QUICK },
  };
};

export const computeDatasetLocations = (
  domain: string | undefined,
  pathSegments: DatasetPath | undefined,
  query: DatasetQuery['raw'] | undefined = {},
  record?: any
): DatasetLocations => {
  return {
    tableLocation: computeTableLocation(domain, pathSegments, query),
    ...computeSingleRecordLocations(domain, pathSegments, query, record),
  };
};

export const useTableLocation = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DeepReadonly<DatasetPath | undefined>>,
  datasetQuery: MaybeRef<DeepReadonly<DatasetQuery | undefined>>
) => {
  return computed(() =>
    computeTableLocation(
      toValue(datasetDomain),
      toValue(datasetPath) as DatasetPath,
      toValue(datasetQuery)?.raw as DatasetQuery['raw']
    )
  );
};

export const useSingleRecordLocations = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DeepReadonly<DatasetPath | undefined>>,
  datasetQuery: MaybeRef<DeepReadonly<DatasetQuery | undefined>>,
  record?: MaybeRef<any>
) => {
  const result = reactiveComputed(() =>
    computeSingleRecordLocations(
      toValue(datasetDomain),
      toValue(datasetPath) as DatasetPath,
      toValue(datasetQuery)?.raw as DatasetQuery['raw'],
      toValue(record)
    )
  );

  return toRefs(result);
};

export const useDatasetLocations = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DeepReadonly<DatasetPath | undefined>>,
  datasetQuery: MaybeRef<DeepReadonly<DatasetQuery | undefined>>,
  record?: MaybeRef<any>
) => {
  const result = reactiveComputed<DatasetLocations>(() =>
    computeDatasetLocations(
      toValue(datasetDomain),
      toValue(datasetPath) as DatasetPath,
      toValue(datasetQuery)?.raw as DatasetQuery['raw'],
      toValue(record)
    )
  );

  return toRefs(result);
};
