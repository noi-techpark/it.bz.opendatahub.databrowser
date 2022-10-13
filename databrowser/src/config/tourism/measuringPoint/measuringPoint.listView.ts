import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

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
    {
      title: 'Last update',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'LastUpdate',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'Source',
      },
    },
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
