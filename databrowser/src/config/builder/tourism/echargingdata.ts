// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasets/config/types';

export const echargingdataCategory = (
  options = { visible: false }
): DetailElements => ({
  name: 'Echarging Properties',
  slug: 'echargingdata',
  visible: options.visible,
  subcategories: [
    {
      name: 'Primary Data (synced from mobility api)',
      properties: [
        {
          title: 'State',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            value: 'AdditionalProperties.EchargingDataProperties.State',
          },
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
          objectMapping: {
            value: 'AdditionalProperties.EchargingDataProperties.AccessType',
          },
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
          title: 'Public accessible',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.ChargingStationAccessible',
          },
        },
        {
          title: 'AccessTypeInfo',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.AccessTypeInfo',
          },
        },
        {
          title: 'PaymentInfo',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.PaymentInfo',
          },
        },
        {
          title: 'Charging Plugs count',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingPlugCount',
          },
        },
        {
          title: 'Charging Plugs Types',
          component: CellComponent.ArrayEditableCell,
          arrayMapping: {
            targetPropertyName: 'items',
            pathToParent:
              'AdditionalProperties.EchargingDataProperties.ChargingCableType',
          },
          required: false,
        },
      ],
    },
    {
      name: 'Survey Information',
      properties: [
        {
          title: 'Survey Date',
          component: CellComponent.DateCell,
          objectMapping: {
            date: 'AdditionalProperties.EchargingDataProperties.SurveyDate',
          },
        },
        {
          title: 'Survey Type',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.SurveyType',
          },
        },
        {
          title: 'Survey Annotations',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.SurveyAnnotations.{language}',
          },
        },
      ],
    },
    {
      name: 'General characteristics',
      properties: [
        {
          title: 'Covered',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled: 'AdditionalProperties.EchargingDataProperties.HasRoof',
          },
        },
        {
          title: 'Vertical road sign',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.VerticalIdentification',
          },
        },
        {
          title: 'Horizontal road sign',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.HorizontalIdentification',
          },
        },
      ],
    },
    {
      name: 'Car parking space next to each other',
      properties: [
        {
          title: 'Flat',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Flat',
          },
        },
        {
          title: 'Gradient',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Inclination',
          },
        },
        {
          title: 'Lateral Inclination',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Crossfall',
          },
        },
        {
          title: 'Pavement',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            value:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.FloorCover',
          },
          params: {
            value_001: 'apshalt-cement',
            label_001: 'asphalt-cement',
            value_002: 'pavement',
            label_002: 'pavement (Pflaster)',
            value_003: 'grassgrid',
            label_003: 'grid (Grasgittersteine)',
            value_004: 'gravel',
            label_004: 'gravel (Kiesbelag)',
            value_005: 'other',
            label_005: 'other',
          },
        },
        {
          title: 'Width',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Width',
          },
        },
        {
          title: 'Length',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Length',
          },
        },
        {
          title: 'Manoeuvrng space signage present',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.HatchingMarked',
          },
        },
      ],
    },
    {
      name: 'Parking spot behind each other',
      properties: [
        {
          title: 'Flat',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Flat',
          },
        },
        {
          title: 'Gradient',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Inclination',
          },
        },
        {
          title: 'Lateral inclination',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Crossfall',
          },
        },
        {
          title: 'Pavement',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.FloorCover',
          },
          params: {
            value_001: 'apshalt-cement',
            label_001: 'asphalt-cement',
            value_002: 'pavement',
            label_002: 'pavement (Pflaster)',
            value_003: 'grassgrid',
            label_003: 'grid (Grasgittersteine)',
            value_004: 'gravel',
            label_004: 'gravel (Kiesbelag)',
            value_005: 'other',
            label_005: 'other',
          },
        },
        {
          title: 'Width',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Width',
          },
        },
        {
          title: 'Length',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Length',
          },
        },
        {
          title: 'Manoeuvrng space signage present',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.HatchingMarked',
          },
        },
      ],
    },
    {
      name: 'Charging station',
      properties: [
        {
          title: 'Display or card reader (cm)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.MaxOperationHeight',
          },
        },
        {
          title: 'Charging Pistol height (cm)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingPistolOperationHeightMax',
          },
        },
        {
          title: 'Charging cable length (cm)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingCableLength',
          },
        },
        {
          title: 'Steepless sidewalk connection',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.SteplessSidewalkConnection',
          },
        },
      ],
    },
    {
      name: 'Other Information',
      properties: [
        {
          title: 'Accessibility',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            value: 'AdditionalProperties.EchargingDataProperties.Barrierfree',
          },
          params: {
            value_001: 'Accessible',
            label_001: 'Accessible',
            value_002: 'ConditionalAccessibility',
            label_002: 'Conditional accessibility',
            value_003: 'NotAccessible',
            label_003: 'Not accessible',
          },
        },
      ],
    },
  ],
});
