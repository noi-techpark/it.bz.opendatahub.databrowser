// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetDomain } from '../../../../config/types';
import { BaseFilter } from '../types';
import { buildMobilityFilterValues } from './mobilityFilterBuilder';
import { buildTourismFilterValues } from './tourismFilterBuilder';

export const buildFilterValues = (
  datasetDomain: DatasetDomain | undefined,
  updatedFilters: BaseFilter[]
): string[] => {
  if (datasetDomain === 'tourism') {
    return buildTourismFilterValues(updatedFilters);
  }
  if (datasetDomain === 'mobility') {
    return buildMobilityFilterValues(updatedFilters);
  }
  console.debug(
    `Can not build filter values for unknown dataset domain "${datasetDomain}", returning empty list`
  );
  return [];
};

export const buildFilterValuesString = (
  datasetDomain: DatasetDomain | undefined,
  updatedFilters: BaseFilter[]
): string | undefined => {
  const filterValues = buildFilterValues(datasetDomain, updatedFilters);
  return filterValues.length > 0 ? `and(${filterValues.join(',')})` : undefined;
};
