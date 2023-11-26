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
      store.updateLocation(
        datasetDomainValue,
        datasetPathValue as DatasetPath,
        datasetQueryValue?.raw as DatasetQuery['raw'],
        recordValue
      );
    },
    { immediate: true }
  );
};
