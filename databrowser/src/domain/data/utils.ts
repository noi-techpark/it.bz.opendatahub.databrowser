// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const computeRecordId = (domain: string | undefined, record?: any) => {
  if (record == null || Array.isArray(record)) {
    return undefined;
  }

  switch (domain) {
    case 'tourism': {
      return record.id ?? record.Id;
    }
    case 'mobility': {
      return record.scode ?? record.id;
    }
    default: {
      return record.id;
    }
  }
};
