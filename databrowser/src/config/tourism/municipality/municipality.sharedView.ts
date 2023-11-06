// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  gpsDataCategory,
  idAndCustomIdCells,
  imageGalleryCategory,
  mainImageCell,
  odhTagCategory,
  regionIdCell,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
} from '../../builder/tourism';

export const municipalitySharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
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
          name: 'Municipality Details',
          properties: [
            {
              title: 'CAP',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Plz',
              },
            },
            {
              title: 'Inhabitants',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Inhabitants',
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'Siag Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SiagId' },
              class: 'break-all',
            },
            {
              title: 'Tourismverein Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'TourismvereinId' },
              class: 'break-all',
            },
            {
              title: 'Istat Number',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'IstatNumber' },
              class: 'break-all',
            },
            regionIdCell('RegionId'),
            {
              title: 'HGV id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mapping.hgv.id' },
              class: 'break-all',
            },
          ],
        },
        dataStatesSubCategory({ hasVisibleInSearch: true }),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    contactCategory(),
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
