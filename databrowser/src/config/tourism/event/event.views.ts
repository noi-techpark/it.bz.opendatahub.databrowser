import { eventDetailView } from './event.detailView';
import { eventEditView } from './event.editView';
import { eventListView } from './event.listView';

export const eventViews = {
  table: eventListView,
  detail: eventDetailView,
  edit: eventEditView,
};
