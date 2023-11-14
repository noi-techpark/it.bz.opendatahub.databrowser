// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  PropertyConfig,
  SubCategoryElement,
} from '../../../domain/datasetConfig/types';

export const sourceSubCategory = (): SubCategoryElement => ({
  name: 'Source',
  properties: [
    {
      title: 'Source',
      component: CellComponent.StringCell,
      objectMappings: { text: 'Source' },
    },
  ],
});

export const sourceTableCell = (): PropertyConfig => ({
  title: 'Source',
  component: CellComponent.StringCell,
  class: 'w-36',
  objectMappings: { text: 'Source' },
});

export const sourceWithInsertsSubCategory = (
  inserts: { position: number; properties: PropertyConfig[] }[]
) => {
  const sources = sourceSubCategory();
  inserts.forEach((insert) => {
    sources.properties.splice(insert.position, 0, ...insert.properties);
  });
  return sources;
};
