// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FeatureCollection, Geometry, Point } from 'geojson';
import { GeoJSONSourceSpecification } from 'maplibre-gl';
import { TourismMetaData } from '../../../metaDataConfig/tourism/types';
import { ApiType } from '../../../metaDataConfig/types';
import { FetchState } from './fetch/types';

export interface ClusterNode {
  type: string;
  geometry: Geometry;
  properties: MapRecord;
}

export interface MarkerFeature {
  id: string;
  name: string;
  abbreviation: string;
  datasetId: string;
  color: string;
}

export interface ClusterFeature {
  id: string;
  name: string;
  count: number;
  datasetId: string;
  color: string;
  markers: MapRecord[];
}

export interface MapRecord {
  recordId: string;
  recordName: string;
}

export interface MapSource extends GeoJSONSourceSpecification {
  data: FeatureCollection<Point, MapRecord>;
}

export interface MapMetaData {
  datasetId: string;
  datasetName: string;
  datasetAbbreviation: string;
  datasetColor: string;
}

export interface MapDatasetBase {
  id: TourismMetaData['id'];
  name: TourismMetaData['shortname'];
  apiType: Exclude<ApiType, 'unknown'>;
  url: NonNullable<TourismMetaData['externalLink']>;
  parentId?: string;
}

export interface AllInOneDataset {
  dataset: MapDatasetBase;
  mapMetaData: MapMetaData;
}

export interface MapSourceWithState {
  mapSource?: MapSource;
  fetchState: FetchState;
}

export interface MapSourceWithMetaData {
  mapSource: MapSource;
  mapMetaData: MapMetaData;
}
