import { eventListView } from './event.listView';
import { eventSharedView } from './event.sharedView';

export const eventViews = {
  table: eventListView,
  detail: eventSharedView(),
  edit: eventSharedView(),
};
