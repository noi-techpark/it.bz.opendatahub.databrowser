// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RecordId } from './types';
import { computeTableLocation } from '../../domain/datasets/location/datasetViewLocation';
import { TourismMetaData } from '../metaDataConfig/tourism/types';

export const computeRecordId = (
  domain: string | undefined,
  record?: unknown
): RecordId => {
  if (record == null || Array.isArray(record)) {
    return undefined;
  }

  switch (domain) {
    case 'tourism': {
      const maybeTourism = record as { id?: string; Id?: string };
      return idToString(maybeTourism.id ?? maybeTourism.Id);
    }
    case 'mobility': {
      // scode is the station code, evuuid is the event uuid, id is the generic id
      const maybeMobility = record as { scode?: string; evuuid?: string; id?: string };
      return idToString(maybeMobility.scode ?? maybeMobility.evuuid ?? maybeMobility.id);
    }
    default: {
      const maybeDefault = record as { id?: string };
      return idToString(maybeDefault.id);
    }
  }
};

const idToString = (id: unknown) =>
  id == null ? undefined : id.toString();

export const getTableLocationFromDataset = (dataset: TourismMetaData) => {
  if (dataset == null || dataset.baseUrl == null) {
    return;
  }

  const domain = translateApiTypeToDomain(dataset);

  const { pathSegments, apiFilter } = dataset;

  return computeTableLocation(domain, pathSegments, apiFilter);
};

export const getApiDomain = (dataset: TourismMetaData) => {
  if (dataset == null || dataset.baseUrl == null) {
    return;
  }

  return translateApiTypeToDomain(dataset);
};

const translateApiTypeToDomain = (dataset: TourismMetaData) => {
  if (dataset.apiType) {
    // Add here all apiTypes
    switch (dataset.apiType) {
      case 'content':
        return 'tourism';
      case 'timeseries':
        return 'mobility';
      default:
        return dataset.apiType;
    }
  } else {
    // Id no apiType is present lets use the dirty hack ;)
    // TODO: this is a very dirty hack to determine if the domain is the tourism or mobility
    // domain. A better solution would be to have a domain property in the dataset metadata,
    // because that way we can support other domains without code changes.
    if (dataset.baseUrl.includes('tourism')) return 'tourism';
    else return 'mobility';
  }
};
