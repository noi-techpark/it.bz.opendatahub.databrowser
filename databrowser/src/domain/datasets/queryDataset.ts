import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';
import axios from 'axios';
import { useApi } from '../api/client';
import { getApiConfigForDataset } from '../api/configUtils';

type ApiResponse = Readonly<UseQueryReturnType<unknown, unknown>>;

function getDataset(url: string): ApiResponse {
  const fetcher = async ({ queryKey }: { queryKey: unknown[] }) => {
    return await axios.get(queryKey[0] as string);
  };

  return useApi(url, fetcher as never);
}

function getDatasetUrl(datasetType: string, datasetId: string): string {
  const configEntry = getApiConfigForDataset(datasetType);

  if (configEntry?.detailEndpoint?.url != null) {
    return configEntry.detailEndpoint.url.replace('{id}', datasetId);
  }

  return '';
}

export { getDataset, getDatasetUrl };
