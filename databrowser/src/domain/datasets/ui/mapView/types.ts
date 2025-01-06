// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { GeoJSONSourceSpecification } from 'maplibre-gl';
import { TourismMetaData } from '../../../metaDataConfig/tourism/types';

export interface ClusterSource {
  id: string;
  source: GeoJSONSourceSpecification;
  count: number;
}

export interface MapClusterSource extends ClusterSource {
  name: string;
  abbreviation: string;
  color: string;
}

export interface FeatureProps {
  id: string;
  name: string;
  abbreviation: string;
  datasetId: string;
  color: string;
}

export type MapDataset = Pick<
  TourismMetaData,
  | 'id'
  | 'apiType'
  | 'baseUrl'
  | 'externalLink'
  | 'parent'
  | 'recordCount'
  | 'shortname'
> & {
  fetching: boolean;
  fetched: boolean;
  error: string | null;
  color: string;
};

export type MapDatasetWithChildren = MapDataset & {
  children: MapDataset[];
};
