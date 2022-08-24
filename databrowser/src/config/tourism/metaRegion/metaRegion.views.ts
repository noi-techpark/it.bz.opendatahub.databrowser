import { metaRegionDetailView } from './metaRegion.detailView';
import { metaRegionEditView } from './metaRegion.editView';
import { metaRegionListView } from './metaRegion.listView';
import { metaRegionQuickView } from './metaRegion.quickView';

export const metaRegionViews = {
  table: metaRegionListView,
  detail: metaRegionDetailView,
  quick: metaRegionQuickView,
  edit: metaRegionEditView,
};
