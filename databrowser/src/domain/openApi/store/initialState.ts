// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DocumentState, SupportedDomains } from '../types';

export const initialState: Record<SupportedDomains, DocumentState> = {
  tourism: {
    loading: false,
    loaded: false,
    error: null,
  },
  mobility: {
    loading: false,
    loaded: false,
    error: null,
  },
};
