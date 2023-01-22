import { metaRegionListView } from './metaRegion.listView';
import { metaRegionSharedView } from './metaRegion.sharedView';

export const metaRegionViews = {
  table: metaRegionListView,
  detail: metaRegionSharedView(),
  edit: metaRegionSharedView(),
};
