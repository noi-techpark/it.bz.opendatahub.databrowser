import { skiAreaDetailView } from './skiArea.detailView';
import { skiAreaEditView } from './skiArea.editView';
import { skiAreaListView } from './skiArea.listView';
import { skiAreaQuickView } from './skiArea.quickView';

export const skiAreaViews = {
  table: skiAreaListView,
  detail: skiAreaDetailView,
  quick: skiAreaQuickView,
  edit: skiAreaEditView,
};
