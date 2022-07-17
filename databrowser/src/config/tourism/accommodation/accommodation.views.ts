import { accommodationDetailView } from './accommodation.detailView';
import { accommodationEditView } from './accommodation.editView';
import { accommodationListView } from './accommodation.listView';
import { accommodationQuickView } from './accommodation.quickView';

export const accommodationViews = {
  table: accommodationListView,
  detail: accommodationDetailView,
  quick: accommodationQuickView,
  edit: accommodationEditView,
};
