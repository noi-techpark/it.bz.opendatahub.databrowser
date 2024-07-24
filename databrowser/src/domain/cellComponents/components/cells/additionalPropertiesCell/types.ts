// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface EchargingDataProperties {
  State: string;
  HasRoof: boolean;
  Capacity: number;
  AccessType: string;
  AccessTypeInfo: Record<string, string>;
  ChargingStationAccessible: boolean;
  PaymentInfo: string;
  ChargingPlugCount: number;
  ChargingCableType: string[];
  SurveyDate: string;
  CarparkingAreaInColumns: boolean;
}

export interface ExampleDataProperties {
  prop1: string;
  prop2: boolean;
}

export interface AdditionalProperties {
  EchargingDataProperties?: EchargingDataProperties;
  ExampleDataProperties?: ExampleDataProperties;
}

export type AdditionalPropertyName = keyof AdditionalProperties;

export type AdditionalPropertyType =
  AdditionalProperties[keyof AdditionalProperties];

export type AdditionalPropertyComponentName =
  | 'EchargingDataCell'
  | 'ExampleDataCell';
