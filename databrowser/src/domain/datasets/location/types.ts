// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface DatasetLocationRoute {
  name?: string;
  params?: Record<string, string | string[]>;
  query?: Record<string, string | (string | null)[] | null>;
}

export interface DatasetLocations {
  tableLocation?: DatasetLocationRoute;
  detailLocation?: DatasetLocationRoute;
  editLocation?: DatasetLocationRoute;
  newLocation?: DatasetLocationRoute;
  rawLocation?: DatasetLocationRoute;
  quickLocation?: DatasetLocationRoute;
}

export interface DatasetLocationRouteLink {
  href?: string;
  navigate: () => void;
}
