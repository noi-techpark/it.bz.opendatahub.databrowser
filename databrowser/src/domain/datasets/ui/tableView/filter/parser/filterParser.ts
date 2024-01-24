// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetDomain } from '../../../../config/types';
import { BaseFilter } from '../types';
import { mobilityParseFilterWithRegex } from './mobilityFilterParserWithRegex';
import { tourismParseFilterWithRegex } from './tourismFilterParserWithRegex';

export const parseFilterWithRegex = (
  datasetDomain: DatasetDomain | undefined,
  filterString?: string
): BaseFilter[] => {
  if (datasetDomain === 'tourism') {
    return tourismParseFilterWithRegex(filterString);
  }
  if (datasetDomain === 'mobility') {
    return mobilityParseFilterWithRegex(filterString);
  }
  console.debug(
    `Can not parse filters for unknown dataset domain "${datasetDomain}", returning empty list`
  );
  return [];
};
