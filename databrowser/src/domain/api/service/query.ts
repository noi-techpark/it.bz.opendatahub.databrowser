// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ParameterValue } from './types';

export const stringifyParameter = (value?: ParameterValue): string => {
  if (value === undefined) {
    return '';
  }
  if (value === null) {
    return 'null';
  }

  return Array.isArray(value) ? value.join(',') : value;
};
