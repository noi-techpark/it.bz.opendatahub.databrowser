import { skiAreaDetailView } from './skiRegion.detailView';
import { skiAreaEditView } from './skiRegion.editView';
import { skiAreaListView } from './skiArea.listView';
import { skiAreaQuickView } from './skiRegion.quickView';

export const skiAreaViews = {
  table: skiAreaListView,
  detail: skiAreaDetailView,
  quick: skiAreaQuickView,
  edit: skiAreaEditView,
};
