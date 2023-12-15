// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later
export interface Marker {
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface PointPosition {
  latitude?: string | number;
  longitude?: string | number;
  altitude?: string | number;
  unitMeasureAltitude?: string | number;
  gpsType?: string;
}
