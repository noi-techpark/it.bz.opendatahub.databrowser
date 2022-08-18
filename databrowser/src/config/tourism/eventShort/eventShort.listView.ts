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
      title: 'Event location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'EventLocation',
      },
    },
    {
      title: 'Description',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'EventDescription',
      },
    },
    {
      title: 'Contact',
      component: CellComponent.TextHighlightCell,
      class: 'w-40',
      fields: {
        title: 'ContactEmail',
        subtitle: 'ContactPhone',
      },
    },
    {
      title: 'Sold out',
      component: CellComponent.TypeBasedCell,
      class: 'w-40',
      fields: {
        data: 'SoldOut',
      },
    },
    {
      title: 'Rooms',
      component: CellComponent.TypeBasedCell,
      class: 'w-40',
      fields: { 
        data: 'RoomBooked' 
      },
    },
    {
      title: 'Languages',
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
      title: 'Start date',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'StartDate',
      },
      params: {
        format: 'dd MMMM yyyy',
      },
    },
    {
      title: 'End date',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'EndDate',
      },
      params: {
        format: 'dd MMMM yyyy',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
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
