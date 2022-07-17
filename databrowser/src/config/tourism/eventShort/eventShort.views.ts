import { eventShortDetailView } from './eventShort.detailView';
import { eventShortEditView } from './eventShort.editView';
import { eventShortListView } from './eventShort.listView';
import { eventShortQuickView } from './eventShort.quickView';

export const eventShortViews = {
  table: eventShortListView,
  detail: eventShortDetailView,
  quick: eventShortQuickView,
  edit: eventShortEditView,
};
