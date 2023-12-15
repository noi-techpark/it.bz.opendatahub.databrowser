// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface NavigationCallback {
  goToPage: (page: number) => void;
  changePageSize: (size: number) => void;
}
