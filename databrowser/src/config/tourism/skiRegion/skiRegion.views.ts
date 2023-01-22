import { skiRegionListView } from './skiRegion.listView';
import { skiRegionSharedView } from './skiRegion.sharedView';

export const skiRegionViews = {
  table: skiRegionListView,
  detail: skiRegionSharedView(),
  edit: skiRegionSharedView(),
};
