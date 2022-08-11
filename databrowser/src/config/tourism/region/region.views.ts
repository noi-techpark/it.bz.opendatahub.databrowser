import { regionDetailView } from './region.detailView';
import { regionEditView } from './region.editView';
import { regionListView } from './region.listView';
import { regionQuickView } from './region.quickView';

export const regionViews = {
  table: regionListView,
  detail: regionDetailView,
  quick: regionQuickView,
  edit: regionEditView,
};
