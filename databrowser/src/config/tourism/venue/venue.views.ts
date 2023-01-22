import { venueListView } from './venue.listView';
import { venueSharedView } from './venue.sharedView';

export const venueViews = {
  table: venueListView,
  detail: venueSharedView(),
  edit: venueSharedView(),
};
