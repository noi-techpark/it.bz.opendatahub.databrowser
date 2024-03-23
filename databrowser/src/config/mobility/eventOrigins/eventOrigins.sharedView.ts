// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';

export const eventOriginsSharedView = ():
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
              title: 'Event name',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'data.0.evname',
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
              objectMapping: { data: 'data.0.evmetadata' },
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
                latitude: 'data.0.evlgeometry.coordinates.1',
                longitude: 'data.0.evlgeometry.coordinates.0',
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
                latitude: 'data.0.evlgeometry.coordinates.1',
                longitude: 'data.0.evlgeometry.coordinates.0',
              },
            },
          ],
        },
      ],
    },
  ],
});
