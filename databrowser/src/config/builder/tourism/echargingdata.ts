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
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.ChargingStationAccessible',
          },
        },
        {
          title: 'AccessTypeInfo',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.AccessTypeInfo.{language}',
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
      ],
    },
    {
      name: 'Survey Data',
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
        {
          title: 'Has Roof',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled: 'AdditionalProperties.EchargingDataProperties.HasRoof',
          },
        },
        {
          title: 'Vertical Identification',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.VerticalIdentification',
          },
        },
        {
          title: 'Horizontal identification',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.HorizontalIdentification',
          },
        },
        {
          title: 'Max operation Height in cm',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.MaxOperationHeight',
          },
        },
        {
          title: 'Charging cable length in cm',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingCableLength',
          },
        },
        {
          title: 'Charging Pistol operation height in cm',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.ChargingPistolOperationHeightMax',
          },
        },
        {
          title: 'Steepless sidewalk connection',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.SteplessSidewalkConnection',
          },
        },
        {
          title: 'Barrierfree',
          component: CellComponent.SelectWithOptionsCell,
          objectMapping: {
            value: 'AdditionalProperties.EchargingDataProperties.Barrierfree',
          },
          params: {
            value_001: 'barrierfree',
            label_001: 'Barrier free',
            value_002: 'restricted accessible',
            label_002: 'restricted accessible',
            value_003: 'not accessible',
            label_003: 'not accessible',
          },
        },
      ],
    },
    {
      name: 'Horizontal Carparking',
      properties: [
        {
          title: 'Flat',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Flat',
          },
        },
        {
          title: 'Inclination',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Inclination',
          },
        },
        {
          title: 'Crossfall',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.Crossfall',
          },
        },
        {
          title: 'FloorCover',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.FloorCover',
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
          title: 'HatchingMarked',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInColumns.HatchingMarked',
          },
        },
      ],
    },
    {
      name: 'Vertical Carparking',
      properties: [
        {
          title: 'Flat',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Flat',
          },
        },
        {
          title: 'Inclination',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Inclination',
          },
        },
        {
          title: 'Crossfall',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.Crossfall',
          },
        },
        {
          title: 'FloorCover',
          component: CellComponent.StringCell,
          objectMapping: {
            text: 'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.FloorCover',
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
          title: 'HatchingMarked',
          component: CellComponent.ToggleCell,
          objectMapping: {
            enabled:
              'AdditionalProperties.EchargingDataProperties.CarparkingAreaInRows.HatchingMarked',
          },
        },
      ],
    },
  ],
});
