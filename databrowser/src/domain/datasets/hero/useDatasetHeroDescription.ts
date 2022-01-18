import { useRoute } from 'vue-router';
import { getApiConfigForDataset } from '../../api/configUtils';

export const useDatasetHeroDescription = () => {
  // Use path parameters to get config for dataset
  const route = useRoute();
  const datasetType = route.params.datasetType as string;

  // Get config parameters
  const { title, subtitle, description } =
    getApiConfigForDataset(datasetType)?.description ?? {};

  return {
    title,
    subtitle,
    description,
  };
};
