// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption } from '../../../../../components/select/types';
import {
  AdditionalProperties,
  AdditionalPropertyComponentName,
  AdditionalPropertyName,
} from './types';

type AdditionalPropertiesOptions = SelectOption<boolean> & {
  propertyName: AdditionalPropertyName;
  componentName: AdditionalPropertyComponentName;
};

export const propertiesOptions = (
  properties: Partial<AdditionalProperties>
): AdditionalPropertiesOptions[] => [
  {
    label: 'Echarging data',
    value: properties.EchargingDataProperties != null,
    propertyName: 'EchargingDataProperties',
    componentName: 'EchargingDataCell',
  },
  {
    label: 'Example data',
    value: properties.ExampleDataProperties != null,
    propertyName: 'ExampleDataProperties',
    componentName: 'ExampleDataCell',
  },
];
