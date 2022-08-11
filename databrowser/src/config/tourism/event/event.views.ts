import { eventDetailView } from './event.detailView';
import { eventEditView } from './event.editView';
import { eventListView } from './event.listView';
import { eventQuickView } from './event.quickView';

export const eventViews = {
  table: eventListView,
  detail: eventDetailView,
  quick: eventQuickView,
  edit: eventEditView,
};
