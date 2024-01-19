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
