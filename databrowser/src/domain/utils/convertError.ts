// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { isAxiosError } from 'axios';

export const toError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  } else if (typeof err === 'string') {
    return new Error(err);
  } else {
    return new Error('Unknown error', { cause: err });
  }
};

export const toErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (isAxiosError(error)) {
    const detail = error?.response?.data;
    if (detail == null) {
      return JSON.stringify(error);
    }
    return `${error} (${JSON.stringify(detail)}))`;
  }
  return JSON.stringify(error);
};
