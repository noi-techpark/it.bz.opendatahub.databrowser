import { odhActivityPoiDetailView } from './odhActivityPoi.detailView';
import { odhActivityPoiEditView } from './odhActivityPoi.editView';
import { odhActivityPoiListView } from './odhActivityPoi.listView';
import { odhActivityPoiQuickView } from './odhActivityPoi.quickView';

export const odhActivityPoiViews = {
  table: odhActivityPoiListView,
  detail: odhActivityPoiDetailView,
  quick: odhActivityPoiQuickView,
  edit: odhActivityPoiEditView,
};
