import { venueDetailView } from './venue.detailView';
import { venueEditView } from './venue.editView';
import { venueListView } from './venue.listView';
import { venueQuickView } from './venue.quickView';

export const venueViews = {
  table: venueListView,
  detail: venueDetailView,
  quick: venueQuickView,
  edit: venueEditView,
};
