// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  gpsDataCategory,
  idReadOnlyCell,
  shortnameCell,
  dataStatesSubCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const measuringPointSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            idReadOnlyCell(),
            shortnameCell(),
            {
              title: 'Owner ID',
              component: CellComponent.StringCell,
              objectMappings: { text: 'OwnerId' },
            },
          ],
        },
        dataStatesSubCategory(),
      ],
    },
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'TV info',
              component: CellComponent.StringCell,
              objectMappings: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region info',
              component: CellComponent.StringCell,
              objectMappings: {
                text: 'LocationInfo.RegionInfo.Name.{language}',
              },
            },
          ],
        },
      ],
    },
    gpsDataCategory(),
    {
      name: 'Sensor data',
      slug: 'sensor-data',
      subcategories: [
        {
          name: 'Sensor data',
          properties: [
            {
              title: 'Snow height',
              component: CellComponent.StringCell,
              objectMappings: { text: 'SnowHeight' },
            },
            {
              title: 'New snow height',
              component: CellComponent.StringCell,
              objectMappings: { text: 'newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMappings: { text: 'Temperature' },
            },
            {
              title: 'Last snow date',
              component: CellComponent.DateCell,
              objectMappings: { date: 'LastSnowDate' },
              params: { format: DEFAULT_DATE_FORMAT },
            },
          ],
        },
      ],
    },
  ],
});
