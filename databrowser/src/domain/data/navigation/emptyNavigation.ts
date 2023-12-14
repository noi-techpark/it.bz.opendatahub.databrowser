// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NavigationCallback } from './types';

export const emptyNavigation = (): NavigationCallback => ({
  goToPage: () => {},
  changePageSize: () => {},
});
