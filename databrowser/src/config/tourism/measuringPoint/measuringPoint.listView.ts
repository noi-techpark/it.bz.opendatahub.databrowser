import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  GPS_DATA_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
} from '../configBuilder';

export const measuringPointListView: ListViewConfig = {
  elements: [
    {
      title: 'Short name',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Shortname',
      },
    },
    {
      title: 'Region info',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'LocationInfo.RegionInfo.Name.{language}',
      },
    },
    {
      title: 'TV info',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'LocationInfo.TvInfo.Name.{language}',
      },
    },
    {
      title: 'Snow height',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'SnowHeight',
      },
    },
    {
      title: 'Temperature',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Temperature',
      },
    },
    { ...GPS_DATA_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
