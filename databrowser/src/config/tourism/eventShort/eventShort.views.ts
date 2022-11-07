import { eventShortDetailView } from './eventShort.detailView';
import { eventShortEditView } from './eventShort.editView';
import { eventShortListView } from './eventShort.listView';

export const eventShortViews = {
  table: eventShortListView,
  detail: eventShortDetailView,
  edit: eventShortEditView,
};
