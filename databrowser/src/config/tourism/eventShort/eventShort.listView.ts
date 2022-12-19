import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const eventShortListView: ListViewConfig = {
  elements: [
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Shortname',
      },
    },
    {
      title: 'Date Start',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'StartDate',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Date End',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'EndDate',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Room Name',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: { text: 'AnchorVenueRoomMapping' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: { text: 'EventLocation' },
    },
    {
      title: 'Available Languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'HasLanguage',
      },
      params: {
        separator: ', ',
      },
    },
    {
      title: 'Last time edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Open Data Hub state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
