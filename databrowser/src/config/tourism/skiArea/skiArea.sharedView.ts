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
  logoWithMainImageCells,
  odhTagCategory,
  seasonCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
  webcamCategory,
  locationCategory,
} from '../../builder/tourism';

export const skiAreaSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell(),
            {
              title: 'Ski region name',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SkiRegionName.{language}' },
            },
            ...logoWithMainImageCells(),
          ],
        },
        {
          name: 'IDs',
          properties: [
            ...idAndCustomIdCells(),
            {
              title: 'SkiRegionId',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SkiRegionId' },
              class: 'break-all',
            },
            {
              title: 'Area Ids',
              component: CellComponent.ArrayCell,
              propertyMappings: {
                items: 'AreaId',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Slope information',
          properties: [
            {
              title: 'Total slope Km',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'TotalSlopeKm' },
            },
            {
              title: 'Slope Km Blue',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SlopeKmBlue' },
            },
            {
              title: 'Slope Km Black',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SlopeKmBlack' },
            },
            {
              title: 'Slope Km Red',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'SlopeKmRed' },
            },
          ],
        },
        {
          name: 'Altimeters',
          properties: [
            {
              title: 'Altimeters From',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeFrom' },
            },
            {
              title: 'Altimeters To',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AltitudeTo' },
            },
          ],
        },
        {
          name: 'Ski map',
          properties: [
            {
              title: 'Ski map',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'SkiAreaMapURL',
              },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    seasonCategory(),
    locationCategory(),
    gpsDataCategory(),
    webcamCategory(),
    odhTagCategory(),
  ],
});
