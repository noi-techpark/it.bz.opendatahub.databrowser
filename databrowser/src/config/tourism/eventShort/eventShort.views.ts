import { eventShortListView } from './eventShort.listView';
import { eventShortSharedView } from './eventShort.sharedView';

export const eventShortViews = {
  table: eventShortListView,
  detail: eventShortSharedView(),
  edit: eventShortSharedView(),
  new: eventShortSharedView(),
};
