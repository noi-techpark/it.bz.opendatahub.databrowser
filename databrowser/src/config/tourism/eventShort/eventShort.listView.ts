import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
} from '../../builder/tourism';

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
      class: 'w-48',
      fields: { date: 'StartDate' },
      params: { format: 'do MMM yyyy HH:mm' },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      fields: { date: 'EndDate' },
      params: { format: 'do MMM yyyy HH:mm' },
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
    languageTableCell(),
    lastChangesTableCell(),
    odhActiveTableCell(),
  ],
};
