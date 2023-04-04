import { odhActivityPoiListView } from './odhActivityPoi.listView';
import { odhActivityPoiSharedView } from './odhActivityPoi.sharedView';
import { odhActivityPoiQuickView } from './odhActivityPoi.quickView';

export const odhActivityPoiViews = {
  table: odhActivityPoiListView,
  detail: odhActivityPoiSharedView(),
  edit: odhActivityPoiSharedView(),
  quick: odhActivityPoiQuickView,
};
