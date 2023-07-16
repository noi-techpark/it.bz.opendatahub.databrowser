// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import {
  stringifyParameter,
  unifyPagination,
  useApiQuery,
  useApiReadForCurrentDataset,
} from '../../api';
import {
  defaultQueryParameters,
  defaultTablePagination,
  validPageSizes,
} from './defaultValues';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { CellComponent } from '../../cellComponents/types';
import { ListElements } from '../../datasetConfig/types';

const fallbackRows = [...Array(25).keys()].map((_, index) => ({ Id: index }));

const buildRenderElementsForLoading = (elements: ListElements[]) =>
  elements.map((element) => ({
    title: element.title,
    class: element.class,
    component: CellComponent.LoadingCell,
    fields: {},
  }));

export const useTableViewLoading = () => {
  const {
    currentApiParameters,
    defaultApiParameters,
    setDefaultApiParameters,
    updateApiParameterValidator,
    updateApiParameterValue,
    useApiParameter,
  } = useApiQuery();

  setDefaultApiParameters(defaultQueryParameters);
  updateApiParameterValidator('pagesize', (value) =>
    validPageSizes.includes(stringifyParameter(value))
  );
  updateApiParameterValidator(
    'pagenumber',
    (value) => parseInt(stringifyParameter(value), 10) > 0
  );

  // Define result mapping function
  const resultMapper = (data: unknown) => {
    const defaultParameters = defaultApiParameters.value;
    const parameters = currentApiParameters.value;
    return unifyPagination(data, { defaultParameters, parameters });
  };

  // Use api read
  const { isError, isStartOrFetch, data, error, url } =
    useApiReadForCurrentDataset({ resultMapper });

  const rows = computed(() =>
    isStartOrFetch.value ? fallbackRows : data.value?.items ?? []
  );

  const datasetConfigStore = useDatasetConfigStore();

  const renderElements = computed(() => {
    const elements = datasetConfigStore.tableView?.elements ?? [];
    return isStartOrFetch.value
      ? buildRenderElementsForLoading(elements)
      : elements;
  });

  // Handle page size
  const pageSize = computed(() => {
    const p = useApiParameter('pagesize').value;
    return stringifyParameter(p);
  });

  const changePageSize = (size: string) =>
    updateApiParameterValue('pagesize', size);

  // Handle pagination
  const pagination = computed(
    () => data.value?.pagination ?? defaultTablePagination
  );

  const changePage = (page: string) =>
    updateApiParameterValue('pagenumber', page);

  const showDetail = computed(() => datasetConfigStore.hasDetailView);

  const showEdit = computed(
    () =>
      datasetConfigStore.hasUpdatePermission &&
      !datasetConfigStore.isSourceGenerated
  );

  const showQuick = computed(() => datasetConfigStore.hasQuickView);

  return {
    error,
    isError,
    pageSize,
    pagination,
    renderElements,
    rows,
    showDetail,
    showEdit,
    showQuick,
    url,
    changePage,
    changePageSize,
  };
};
