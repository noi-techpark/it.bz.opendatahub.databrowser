// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface LatLngPosition {
  lat: number;
  lng: number;
}

export interface MapGLOptions {
  center?: LatLngPosition;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

export interface Marker<T = unknown> {
  x: number;
  y: number;
  data: T;
}

export interface MarkerCollection {
  id: string;
  markers?: Marker[];
}
