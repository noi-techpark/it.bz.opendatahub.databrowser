import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  GPS_DATA_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
} from '../configBuilderListView';

export const webcamInfoListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'Webcamurl',
      },
    },
    {
      title: 'Webcam Name',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Webcamname.{language}',
      },
    },
    {
      title: 'Webcam URL',
      component: CellComponent.UrlCell,
      class: 'w-40',
      fields: {
        text: 'Webcamurl',
      },
    },
    { ...GPS_DATA_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
