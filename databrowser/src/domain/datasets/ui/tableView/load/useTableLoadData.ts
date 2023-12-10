// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, toValue } from 'vue';
import { useApiRead } from '../../../../api/useApi';
import { useUnwrapData } from '../../../../api/dataExtraction';
import { usePagination } from '../../../../data/pagination/usePagination';
import { DatasetDomain, DatasetQuery } from '../../../config/types';
import { useHandleDataLoading } from './useHandleDataLoading';

export const useTableLoadData = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetQuery: MaybeRef<DatasetQuery | undefined>,
  fullPath: MaybeRef<string | undefined>
) => {
  // Fetch data
  const { data, error, isError, isLoading } = useApiRead(fullPath, {
    withAuth: true,
  });

  // Unwrap data, because the data may be wrapped wrapped in a "Items" or "data"
  const unwrappedData = useUnwrapData<unknown[]>(data);

  // Handle loading state
  const dataWithLoadingSupport = useHandleDataLoading(isLoading, unwrappedData);

  // Compute pagination
  const pagination = usePagination(
    toValue(datasetDomain),
    toValue(datasetQuery),
    data
  );

  return {
    data: dataWithLoadingSupport,
    pagination,
    error,
    isError,
    isDataLoading: isLoading,
  };
};
