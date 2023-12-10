// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const toError = (err: unknown): Error => {
  if (err instanceof Error) {
    return err;
  } else if (typeof err === 'string') {
    return new Error(err);
  } else {
    return new Error('Unknown error', { cause: err });
  }
};
