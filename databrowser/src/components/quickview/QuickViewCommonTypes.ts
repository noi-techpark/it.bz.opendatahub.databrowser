// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export enum MediaItemType {
  IMAGE = 'IMAGE',
}

export interface MediaItem {
  type: MediaItemType;
  url: string;
  name: string;
}
