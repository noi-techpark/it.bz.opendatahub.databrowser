import { accommodationDetailView } from './accommodation.detailView';
import { accommodationEditView } from './accommodation.editView';
import { accommodationListView } from './accommodation.listView';

export const accommodationViews = {
  table: accommodationListView,
  detail: accommodationDetailView,
  edit: accommodationEditView,
};
