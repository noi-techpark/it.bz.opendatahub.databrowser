import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const snowReportListView: ListViewConfig = {
  //edit source odh
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'SkiMapUrl',
      },
    },
    {
      title: 'Logo',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'contactlogo',
      },
    },
    {
      title: 'Name',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Areaname',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'contactcity',
      },
    },
    {
      title: 'Slope km',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'SkiAreaSlopeKm',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'lang',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'Measuringpoints.0.LastUpdate',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'Measuringpoints.0.Source',
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
