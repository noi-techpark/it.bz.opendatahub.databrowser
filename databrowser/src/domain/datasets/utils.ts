// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RecordId } from './types';

export const computeRecordId = (
  domain: string | undefined,
  record?: any
): RecordId => {
  if (record == null || Array.isArray(record)) {
    return undefined;
  }

  switch (domain) {
    case 'tourism': {
      return idToString(record.id ?? record.Id);
    }
    case 'mobility': {
      return idToString(record.scode ?? record.id);
    }
    default: {
      return idToString(record.id);
    }
  }
};

const idToString = (id: unknown) => (id == null ? undefined : id.toString());
