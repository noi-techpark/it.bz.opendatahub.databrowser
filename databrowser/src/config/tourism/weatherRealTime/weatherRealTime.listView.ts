import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherRealTimeListView: ListViewConfig = {
  elements: [
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'name',
      },
    },
    {
      title: 'StationId',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'id',
      },
    },
    {
      title: 'Temperature',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 't',
      },
    },
    {
      title: 'Altitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'altitude',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'lastUpdated',
      },
      params: {
        format: 'dd MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'LicenseRealTime.LicenseHolder',
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
