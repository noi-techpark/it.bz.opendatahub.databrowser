// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface VideoItemsEntry {
  name?: string;
  url?: string;
  videoSource?: string;
  videoType?: string;
  streamingSource?: string;
  videoTitle?: string;
  videoDesc?: string;
  active?: boolean;
  copyright?: string;
  license?: string;
  licenseHolder?: string;
  language?: string;
  width?: number;
  height?: number;
  bitrate?: string;
  duration?: number;
  definition?: string;
  resolution?: string;
}
