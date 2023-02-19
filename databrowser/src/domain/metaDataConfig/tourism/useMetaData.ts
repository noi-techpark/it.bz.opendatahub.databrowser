import { parse } from 'date-fns';
import { useQuery } from 'vue-query';
import { withOdhBaseUrl } from '../../../config/utils';
import { unifyPagination, useAxiosFetcher } from '../../api';
import { TourismMetaData } from './types';
import { parseFilterQuery } from './utils';

interface OdhTourismMetaData {
  ApiIdentifier: string;
  ApiFilter: string;
  Id: string;
  OdhType: string;
  SwaggerUrl: string;
  Self: string;
  ApiUrl: string;
  Deprecated: boolean;
  SingleDataset: boolean;
  FirstImport: string;
  LastChange: string;
  Shortname: string;
  Sources: string[];
  RecordCount: { open?: number; closed?: number; reduced?: number };
  Output: Record<string, string>;
  ApiDescription: Record<string, string>;
  ApiVersion: string;
  PathParam: string[];
  PublishedOn: string[];
  ApiAccess: Record<string, string>;
}

const metaDataUrl = withOdhBaseUrl('/v1/MetaData?pagesize=1000');

export const useMetaData = () => {
  const queryKey = metaDataUrl;
  const queryFn = useAxiosFetcher<OdhTourismMetaData>();
  return useQuery({
    queryKey,
    queryFn,
    select(data): TourismMetaData[] {
      if (data?.data == null) {
        return [];
      }
      const paginationData = unifyPagination(data.data);
      // Map ODH MetaData to internal format
      return paginationData.items
        .map<TourismMetaData>((dataset) => ({
          id: dataset.Id,
          title: dataset.ApiIdentifier,
          description: dataset.ApiDescription.en,
          output: Object.values(dataset.Output ?? {}).join(', '),
          apiVersion: dataset.ApiVersion,
          swaggerUrl: dataset.SwaggerUrl,
          access: parseAccess(dataset.ApiAccess),
          pathParam: dataset.PathParam,
          externalLink: dataset.ApiUrl,
          sources: dataset.Sources,
          lastUpdated: parse(
            dataset.LastChange,
            'dd.MM.yyyy HH:mm',
            new Date()
          ),
          apiFilter: parseFilterQuery(dataset.ApiFilter),
          recordCount: dataset.RecordCount as Record<string, number>,
          deprecated: dataset.Deprecated,
        }))
        .sort((a, b) => a?.title?.localeCompare(b?.title));
    },
  });
};

const parseAccess = (
  apiAccess: Record<string, string>
): TourismMetaData['access'] => {
  // apiAccess is an object with keys like "open", "closed", "reduced" and values like "open", "closed", "reduced"
  const accessTypes = new Set(Object.values(apiAccess));
  if (accessTypes.has('closed')) {
    return 'closed';
  }
  if (accessTypes.has('reduced')) {
    return 'limited';
  }
  if (accessTypes.has('open')) {
    return 'opendata';
  }
  return 'unknown';
};
