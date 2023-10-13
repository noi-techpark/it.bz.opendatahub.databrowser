// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption, SelectValue } from './types';

export const emptyValueOption = (): SelectOption => ({
  label: '--- NO VALUE ---',
  value: undefined,
});

export const addNewValueOption = (): SelectOption => ({
  label: '+ ADD NEW',
  value: '',
  isAction: true,
});

export const unknownValueLabel = (value?: SelectValue) =>
  `--- Unknown value (${value}) ---`;
