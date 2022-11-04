import { metaRegionDetailView } from './metaRegion.detailView';
import { metaRegionEditView } from './metaRegion.editView';
import { metaRegionListView } from './metaRegion.listView';

export const metaRegionViews = {
  table: metaRegionListView,
  detail: metaRegionDetailView,
  edit: metaRegionEditView,
};
