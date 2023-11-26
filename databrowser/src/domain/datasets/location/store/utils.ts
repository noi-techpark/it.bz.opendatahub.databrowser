// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DeepReadonly, MaybeRef, toValue, watch } from 'vue';
import { useDatasetLocationStore } from './useDatasetLocationStore';
import {
  DatasetDomain,
  DatasetPath,
  DatasetQuery,
} from '../../../datasetConfig/types';
import { unwrapData } from '../../../api/dataExtraction/dataExtraction';

const computeSingleRecordData = (
  datasetDomain: DatasetDomain | undefined,
  record: any
) => {
  if (datasetDomain !== 'mobility') {
    return record;
  }

  const unwrappedData = unwrapData(record);
  return Array.isArray(unwrappedData) ? unwrappedData[0] : unwrappedData;
};

export const updateDatasetLocationStore = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DeepReadonly<DatasetPath | undefined>>,
  datasetQuery: MaybeRef<DeepReadonly<DatasetQuery | undefined>>,
  record?: MaybeRef<any>
) => {
  const store = useDatasetLocationStore();
  watch(
    [
      () => toValue(datasetDomain),
      () => toValue(datasetPath),
      () => toValue(datasetQuery),
      () => toValue(record),
    ],
    ([
      datasetDomainValue,
      datasetPathValue,
      datasetQueryValue,
      recordValue,
    ]) => {
      // Mobility API single record result needs special treatment
      // because it returns an array of records instead of a single record
      const singleRecordData = computeSingleRecordData(
        datasetDomainValue,
        recordValue
      );

      store.updateLocation(
        datasetDomainValue,
        datasetPathValue as DatasetPath,
        datasetQueryValue?.raw as DatasetQuery['raw'],
        singleRecordData
      );
    },
    { immediate: true }
  );
};
