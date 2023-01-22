import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  gpsDataTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
} from '../../builder/tourism';

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
    gpsDataTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
