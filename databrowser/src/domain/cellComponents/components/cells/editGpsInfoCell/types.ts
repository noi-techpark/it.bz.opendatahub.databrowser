// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface GpsInfoEntry {
  gpsType?: string;
  latitude?: string | number;
  longitude?: string | number;
  altitude?: string | number;
  unitMeasureAltitude?: string;
}
