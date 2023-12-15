// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption, SelectValue } from './types';

export const emptyValueOption = (): SelectOption => ({
  label: '--- NO VALUE ---',
  value: undefined,
});

export const selectAddNewValue = '+ ADD NEW';

export const addNewValueOption = (): SelectOption => ({
  label: selectAddNewValue,
  value: selectAddNewValue,
  isAction: true,
});

export const unknownValueLabel = (value?: SelectValue) =>
  `--- Unknown value (${value}) ---`;
