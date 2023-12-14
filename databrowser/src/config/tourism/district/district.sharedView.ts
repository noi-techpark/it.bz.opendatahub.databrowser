// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import {
  dataStatesWithInsertsSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  locationCategoryDistrict,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
} from '../../builder/tourism';

export const districtSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Siag ID',
              component: CellComponent.StringCell,
              objectMapping: { text: 'SiagId' },
            },
            {
              title: 'HGV ID',
              component: CellComponent.StringCell,
              objectMapping: { text: 'hgv.id' },
            },
          ],
        },
        {
          ...dataStatesWithInsertsSubCategory([
            {
              position: 1,
              properties: [
                {
                  title: 'Is comune',
                  component: CellComponent.ToggleCell,
                  objectMapping: { enabled: 'IsComune' },
                },
                {
                  title: 'Visible in Search',
                  component: CellComponent.ToggleCell,
                  objectMapping: { enabled: 'VisibleInSearch' },
                },
              ],
            },
          ]),
        },
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    locationCategoryDistrict(),
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
