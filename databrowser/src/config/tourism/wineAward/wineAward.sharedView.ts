// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import {
  dataStatesSubCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  mainImageCell,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';

export const wineAwardSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell(), mainImageCell()],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Company Id',
              component: CellComponent.StringCell,
              objectMapping: { text: 'CompanyId' },
              class: 'break-all',
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    {
      name: 'Wine Award Details',
      slug: 'Wine Award Details',
      subcategories: [
        {
          name: 'Wine Award Details',
          properties: [
            {
              title: 'Vintage',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Vintage' },
            },
            {
              title: 'Awardyear',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Awardyear' },
            },
            {
              title: 'Awards',
              component: CellComponent.ArrayCell,
              objectMapping: {
                items: 'Awards',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
      ],
    },
  ],
});
