import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilder';

export const skiRegionListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    {
      title: 'Logo',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'ContactInfos.{language}.LogoUrl',
      },
    },
    { ...TITLE_TABLE_CONFIG },
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
