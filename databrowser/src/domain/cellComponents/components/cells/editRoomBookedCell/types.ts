// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface RoomBookedEntry {
  space?: string;
  spaceDesc?: string;
  spaceAbbrev?: string;
  spaceType?: string;
  subtitle?: string;
  comment?: string;
  startDate?: string;
  endDate?: string;
  startDateUTC?: number;
  endDateUTC?: number;
  spaceDescRoomMapping?: string;
}
