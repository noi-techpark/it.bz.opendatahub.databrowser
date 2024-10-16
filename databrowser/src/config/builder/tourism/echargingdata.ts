// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { DetailElements } from '../../../domain/datasets/config/types';
import { withOdhBaseUrl } from '../../utils';

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
          title: 'Charging Plugs Types',
          component: CellComponent.ArrayEditableCell,
          arrayMapping: {
            targetPropertyName: 'items',
            pathToParent:
              'AdditionalProperties.EchargingDataProperties.ChargingPistolTypes',
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
          component: CellComponent.SelectWithOptionsCell,
          class: 'w-60',
          objectMapping: {
            value: 'AdditionalProperties.EchargingDataProperties.SurveyType',
          },
          params: {
            showAddNewValue: 'true',
            showValueAsLabelFallback: 'true',
            url: withOdhBaseUrl(
              '/v1/Distinct?odhtype=odhactivitypoi&fields=AdditionalProperties.EchargingDataProperties.SurveyType&rawsort=AdditionalProperties.EchargingDataProperties.SurveyType&getasarray=true'
            ),
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
            enabled: 'AdditionalProperties.EchargingDataProperties.Covered',
          },
        },
        {
          title: 'Vertical road sign',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.VerticalRoadSign',
          },
        },
        {
          title: 'Horizontal floor road sign',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.HorizontalFloorRoadSign',
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
              'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.Flat',
          },
        },
        {
          title: 'Gradient (%)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.Gradient',
          },
        },
        {
          title: 'Lateral Inclination (%)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.LateralInclination',
          },
        },
        {
          title: 'Pavement',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            value:
              'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.Pavement',
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
          title: 'Width (m)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.Width',
          },
        },
        {
          title: 'Length (m)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.Length',
          },
        },
        {
          title: 'Manoeuvrng space signage present',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarParkingSpaceNextToEachOther.ManeuvringSpaceSignagePresent',
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
              'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.Flat',
          },
        },
        {
          title: 'Gradient (%)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.Gradient',
          },
        },
        {
          title: 'Lateral inclination (%)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.LateralInclination',
          },
        },
        {
          title: 'Pavement',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.Pavement',
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
          title: 'Width (m)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.Width',
          },
        },
        {
          title: 'Length (m)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.Length',
          },
        },
        {
          title: 'Manoeuvrng space signage present',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarParkingSpaceBehindEachOther.ManeuvringSpaceSignagePresent',
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
            text: 'AdditionalProperties.EchargingDataProperties.DisplayOrCardReaderOperationHeight',
          },
        },
        {
          title: 'Charging Pistol height (cm)',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingPistolOperationHeight',
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
          title: 'Shielding post in front of charging station',
          component: CellComponent.ToggleTriStateCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ShieldingPostInFrontOfStation',
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
        {
          title: 'Survey Annotations',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.SurveyAnnotations.{language}',
          },
        },
      ],
    },
  ],
});
