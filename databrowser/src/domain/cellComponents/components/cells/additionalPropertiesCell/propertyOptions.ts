// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption } from '../../../../../components/select/types';
import { echargingdataCategory } from '../../../../../config/builder/tourism/echargingdata';
import { AdditionalProperty } from './types';

// Add here new additional properties
const { name, slug } = echargingdataCategory();

export type AdditionalPropertiesOptions = SelectOption<string> &
  AdditionalProperty;

// FIXME: remove test element
export const availableAdditionalPropertiesOptions: AdditionalPropertiesOptions[] =
  [
    {
      label: name,
      value: 'AdditionalProperties.EchargingDataProperties',
      slug,
    },
    {
      label: name + ' TEST',
      value: 'AdditionalProperties.EchargingDataProperties_TEST',
      slug: slug + ' TEST',
    },
  ];
