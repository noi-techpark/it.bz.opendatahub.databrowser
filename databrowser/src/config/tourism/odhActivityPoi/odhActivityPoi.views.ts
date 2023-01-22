import { odhActivityPoiListView } from './odhActivityPoi.listView';
import { odhActivityPoiSharedView } from './odhActivityPoi.sharedView';

export const odhActivityPoiViews = {
  table: odhActivityPoiListView,
  detail: odhActivityPoiSharedView(),
  edit: odhActivityPoiSharedView(),
};
