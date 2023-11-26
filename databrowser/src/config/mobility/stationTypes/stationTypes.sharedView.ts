// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';

export const stationTypesSharedView = ():
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
            {
              title: 'sname',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.sname',
              },
            },
            {
              title: 'scode',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.scode',
              },
            },
            {
              title: 'stype',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.stype',
              },
            },
          ],
        },
        {
          name: 'Datastates',
          properties: [
            {
              title: 'mtransactiontime',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.mtransactiontime',
              },
            },
            {
              title: 'savailable',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.savailable',
              },
            },
            {
              title: 'sactive',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.sactive',
              },
            },
          ],
        },
        {
          name: 'Source and provenance',
          properties: [
            {
              title: 'sorigin',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.sorigin',
              },
            },
            {
              title: 'prname',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.prname',
              },
            },
            {
              title: 'prversion',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.prversion',
              },
            },
            {
              title: 'prlineage',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.prlineage',
              },
            },
          ],
        },
        {
          name: 'Metadata',
          properties: [
            {
              title: 'JSON',
              component: CellComponent.JsonCell,
              objectMapping: { data: 'data.0.smetadata' },
              params: { usePreformatted: 'true' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'gps-data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell,
              objectMapping: {
                latitude: 'data.0.scoordinate.y',
                longitude: 'data.0.scoordinate.x',
              },
            },
            {
              title: 'srid',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.scoordinate.srid',
              },
            },
          ],
        },
        {
          name: 'Map',
          properties: [
            {
              title: '',
              component: CellComponent.QuickViewMapView,
              objectMapping: {
                latitude: 'data.0.scoordinate.y',
                longitude: 'data.0.scoordinate.x',
              },
            },
          ],
        },
      ],
    },
  ],
});
