// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FetchState } from './types';

export const buildStartFetchState = (): FetchState => ({
  fetching: true,
  fetched: false,
  error: null,
});

export const buildFinishFetchState = (): FetchState => ({
  fetching: false,
  fetched: true,
  error: null,
});

export const buildErrorFetchState = (error: string): FetchState => ({
  fetching: false,
  fetched: true,
  error,
});
