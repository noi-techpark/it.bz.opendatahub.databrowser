import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const eventShortListView: ListViewConfig = {
  elements: [
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: { text: 'EventTitle.{language}' },
    },
    {
      title: 'Date start',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: { date: 'StartDate' },
      params: { format: 'do MMMM yyyy' },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: { date: 'EndDate' },
      params: { format: 'do MMMM yyyy' },
    },
    {
      title: 'Rooms',
      component: CellComponent.TypeBasedCell,
      class: 'w-40',
      fields: { data: 'RoomBooked' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: { text: 'EventLocation' },
    },
    {
      title: 'Languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: { items: 'HasLanguage' },
      params: { separator: ', ' },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: { date: 'LastChange' },
      params: { format: 'do MMMM yyyy' },
    },
    {
      title: 'Open Data Hub state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: { state: 'OdhActive' },
    },
  ],
};
