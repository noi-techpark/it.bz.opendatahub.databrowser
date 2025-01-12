// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type FetchState = {
  fetching: boolean;
  fetched: boolean;
  error: string | null;
};
