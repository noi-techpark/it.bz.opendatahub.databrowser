import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  LOGO_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilderListView';

export const skiRegionListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    { ...LOGO_TABLE_CONFIG },
    { ...TITLE_TABLE_CONFIG },
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
