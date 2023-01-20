import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  GPS_DATA_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilder';

export const municipalityListView: ListViewConfig = {
  elements: [
    { ...TITLE_TABLE_CONFIG },
    {
      title: 'CAP',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Plz',
      },
    },
    { ...GPS_DATA_TABLE_CONFIG },
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
