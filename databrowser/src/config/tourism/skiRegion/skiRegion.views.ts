import { skiRegionDetailView } from './skiRegion.detailView';
import { skiRegionEditView } from './skiRegion.editView';
import { skiRegionListView } from './skiRegion.listView';
import { skiRegionQuickView } from './skiRegion.quickView';

export const skiRegionViews = {
  table: skiRegionListView,
  detail: skiRegionDetailView,
  quick: skiRegionQuickView,
  edit: skiRegionEditView,
};
