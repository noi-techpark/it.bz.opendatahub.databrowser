import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { tourismAssociationListDescription } from './tourismAssociationList.description';
import { tourismAssociationListOperations } from './tourismAssociationList.operations';
import { tourismAssociationListViews } from './tourismAssociationList.views';
import { tourismAssociationListRoute } from './tourismAssociationList.route';

export const tourismAssociationListConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: tourismAssociationListRoute,
  description: tourismAssociationListDescription,
  views: tourismAssociationListViews,
  operations: tourismAssociationListOperations,
};
