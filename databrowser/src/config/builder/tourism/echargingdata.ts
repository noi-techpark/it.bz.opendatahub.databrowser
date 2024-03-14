// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasets/config/types';

export const echargingdataCategory = (): DetailElements => ({
  name: 'Echarging Properties',
  slug: 'echargingdata',
  subcategories: [
    {
      name: 'Echarging Data',
      properties: [
        {
          title: 'State',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: { text: 'AdditionalProperties.Data.State' },
          params: {
            value_001: 'UNAVAILABLE',
            label_001: 'unavailable',
            value_002: 'ACTIVE',
            label_002: 'active',
            value_003: 'TEMPORARYUNAVAILABLE',
            label_003: 'temporary unavailable',
            value_004: 'AVAILABLE',
            label_004: 'available',
            value_005: 'UNKNOWN',
            label_005: 'unknown',
            value_006: 'FAULT',
            label_006: 'fault',
            value_007: 'PLANNED',
            label_007: 'planned',
          },
        },
        {
          title: 'AccessType',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: { value: 'AdditionalProperties.Data.AccessType' },
          params: {
            value_001: 'PUBLIC',
            label_001: 'public',
            value_002: 'PRIVATE',
            label_002: 'private',
            value_003: 'PRIVATE_WITHPUBLICACCESS',
            label_003: 'private with public access',
          },
        },
        {
          title: 'AccessTypeInfo',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.Data.AccessTypeInfo.{language}',
          },
        },
        {
          title: 'PaymentInfo',
          component: CellComponent.StringCell,
          objectMapping: { text: 'AdditionalProperties.Data.PaymentInfo' },
        },
      ],
    },
  ],
});
